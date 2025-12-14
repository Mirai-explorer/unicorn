// utils/networkUtils.ts
/**
 * 网络请求工具函数
 */

import { ApiResponse, RequestConfig } from '@/types';

export class NetworkUtils {
    private static defaultConfig: RequestConfig = {
        timeout: 10000,
        retry: 3,
        retryDelay: 1000,
        cache: false,
        cacheTTL: 300000 // 5分钟
    };

    private static cache = new Map<string, { data: unknown; timestamp: number }>();

    /**
     * 基础请求方法
     */
    static async request<T = unknown>(
        url: string,
        options: RequestInit = {},
        config: Partial<RequestConfig> = {}
    ): Promise<ApiResponse<T>> {
        const mergedConfig = { ...this.defaultConfig, ...config };
        const cacheKey = this.getCacheKey(url, options);

        // 检查缓存
        if (mergedConfig.cache) {
            const cached = this.getFromCache(cacheKey, mergedConfig.cacheTTL!);
            if (cached) {
                return { success: true, data: cached, timestamp: Date.now() };
            }
        }

        let lastError: Error | null = null;

        for (let attempt = 0; attempt <= mergedConfig.retry!; attempt++) {
            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), mergedConfig.timeout);

                const response = await fetch(url, {
                    ...options,
                    signal: controller.signal
                });

                clearTimeout(timeoutId);

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }

                const data = await response.json();
                const result: ApiResponse<T> = {
                    success: true,
                    data,
                    timestamp: Date.now()
                };

                // 缓存结果
                if (mergedConfig.cache) {
                    this.setToCache(cacheKey, data);
                }

                return result;
            } catch (error) {
                lastError = error as Error;

                if (attempt < mergedConfig.retry!) {
                    await this.sleep(mergedConfig.retryDelay!);
                }
            }
        }

        return {
            success: false,
            data: null as any,
            error: lastError?.message || '请求失败',
            timestamp: Date.now()
        };
    }

    /**
     * GET 请求
     */
    static async get<T = unknown>(
        url: string,
        params: Record<string, never> = {},
        config: Partial<RequestConfig> = {}
    ): Promise<ApiResponse<T>> {
        const queryString = new URLSearchParams(params).toString();
        const fullUrl = queryString ? `${url}?${queryString}` : url;

        return this.request<T>(fullUrl, { method: 'GET' }, config);
    }

    /**
     * POST 请求
     */
    static async post<T = unknown>(
        url: string,
        data: unknown = {},
        config: Partial<RequestConfig> = {}
    ): Promise<ApiResponse<T>> {
        return this.request<T>(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...config.headers
            },
            body: JSON.stringify(data)
        }, config);
    }

    /**
     * JSONP 请求（用于跨域）
     */
    static jsonp<T = any>(url: string, callbackName: string = 'callback'): Promise<T> {
        return new Promise((resolve, reject) => {
            // 创建唯一的回调函数名
            const uniqueCallbackName = `jsonp_${Date.now()}_${Math.random().toString(36).slice(2)}`;

            // 创建 script 标签
            const script = document.createElement('script');
            const fullUrl = `${url}${url.includes('?') ? '&' : '?'}${callbackName}=${uniqueCallbackName}`;

            script.src = fullUrl;
            script.onerror = () => reject(new Error('JSONP 请求失败'));

            // 设置全局回调函数
            (window as any)[uniqueCallbackName] = (data: T) => {
                resolve(data);
                this.cleanupJsonp(script, uniqueCallbackName);
            };

            document.head.appendChild(script);
        });
    }

    /**
     * 清理 JSONP 资源
     */
    private static cleanupJsonp(script: HTMLScriptElement, callbackName: string): void {
        document.head.removeChild(script);
        delete (window as any)[callbackName];
    }

    /**
     * 检查网络连接状态
     */
    static checkConnection(): Promise<boolean> {
        return new Promise((resolve) => {
            if (!navigator.onLine) {
                resolve(false);
                return;
            }

            // 尝试请求一个小的资源来确认连接
            fetch('https://www.google.com/favicon.ico', {
                method: 'HEAD',
                mode: 'no-cors',
                cache: 'no-cache'
            })
                .then(() => resolve(true))
                .catch(() => resolve(false));
        });
    }

    /**
     * 获取网络类型
     */
    static getNetworkType(): 'slow-2g' | '2g' | '3g' | '4g' | 'unknown' {
        const connection = (navigator as any).connection;
        if (connection && connection.effectiveType) {
            return connection.effectiveType;
        }
        return 'unknown';
    }

    /**
     * 获取缓存键
     */
    private static getCacheKey(url: string, options: RequestInit): string {
        return `${url}_${JSON.stringify(options)}`;
    }

    /**
     * 从缓存获取数据
     */
    private static getFromCache(key: string, ttl: number): any | null {
        const cached = this.cache.get(key);
        if (!cached) return null;

        const isExpired = Date.now() - cached.timestamp > ttl;
        if (isExpired) {
            this.cache.delete(key);
            return null;
        }

        return cached.data;
    }

    /**
     * 设置缓存数据
     */
    private static setToCache(key: string, data: unknown): void {
        this.cache.set(key, {
            data,
            timestamp: Date.now()
        });

        // 简单的缓存清理（防止内存泄漏）
        if (this.cache.size > 100) {
            const firstKey = this.cache.keys().next().value!;
            this.cache.delete(firstKey);
        }
    }

    /**
     * 等待指定时间
     */
    private static sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * 清除所有缓存
     */
    static clearCache(): void {
        this.cache.clear();
    }

    /**
     * 获取缓存统计信息
     */
    static getCacheStats(): { size: number; keys: string[] } {
        return {
            size: this.cache.size,
            keys: Array.from(this.cache.keys())
        };
    }
}