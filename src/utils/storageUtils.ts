// utils/storageUtils.ts
/**
 * 存储相关工具函数
 */

export class StorageHelper {
    private static prefix = 'mirai_player_';

    /**
     * 获取存储键名
     */
    private static getKey(key: string): string {
        return `${this.prefix}${key}`;
    }

    /**
     * 设置本地存储
     */
    static set<T>(key: string, value: T): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                const serializedValue = JSON.stringify(value);
                localStorage.setItem(this.getKey(key), serializedValue);
                resolve();
            } catch (error) {
                reject(new Error(`存储失败: ${error}`));
            }
        });
    }

    /**
     * 获取本地存储
     */
    static get<T>(key: string, defaultValue?: T): Promise<T | null> {
        return new Promise((resolve) => {
            try {
                const item = localStorage.getItem(this.getKey(key));
                if (item) {
                    const value = JSON.parse(item) as T;
                    resolve(value);
                } else {
                    resolve(defaultValue || null);
                }
            } catch (error) {
                console.error('读取存储失败:', error);
                resolve(defaultValue || null);
            }
        });
    }

    /**
     * 删除本地存储
     */
    static remove(key: string): Promise<void> {
        return new Promise((resolve) => {
            try {
                localStorage.removeItem(this.getKey(key));
                resolve();
            } catch (error) {
                console.error('删除存储失败:', error);
                resolve();
            }
        });
    }

    /**
     * 清空所有播放器相关存储
     */
    static clear(): Promise<void> {
        return new Promise((resolve) => {
            try {
                const keysToRemove: string[] = [];

                for (let i = 0; i < localStorage.length; i++) {
                    const key = localStorage.key(i);
                    if (key && key.startsWith(this.prefix)) {
                        keysToRemove.push(key);
                    }
                }

                keysToRemove.forEach(key => localStorage.removeItem(key));
                resolve();
            } catch (error) {
                console.error('清空存储失败:', error);
                resolve();
            }
        });
    }

    /**
     * 获取存储使用情况
     */
    static getUsage(): { used: number; total: number } {
        let used = 0;

        try {
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.startsWith(this.prefix)) {
                    const value = localStorage.getItem(key);
                    used += (key.length + (value ? value.length : 0)) * 2; // UTF-16
                }
            }
        } catch (error) {
            console.error('获取存储使用情况失败:', error);
        }

        // 本地存储通常有 5MB 限制
        return { used, total: 5 * 1024 * 1024 };
    }

    /**
     * 检查存储是否可用
     */
    static isAvailable(): boolean {
        try {
            const testKey = this.getKey('test');
            localStorage.setItem(testKey, 'test');
            localStorage.removeItem(testKey);
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * 导出所有数据
     */
    static exportData(): Record<string, any> {
        const data: Record<string, any> = {};

        try {
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.startsWith(this.prefix)) {
                    const value = localStorage.getItem(key);
                    if (value) {
                        const cleanKey = key.replace(this.prefix, '');
                        data[cleanKey] = JSON.parse(value);
                    }
                }
            }
        } catch (error) {
            console.error('导出数据失败:', error);
        }

        return data;
    }

    /**
     * 导入数据
     */
    static importData(data: Record<string, any>): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                Object.entries(data).forEach(([key, value]) => {
                    this.set(key, value);
                });
                resolve();
            } catch (error) {
                reject(new Error(`导入数据失败: ${error}`));
            }
        });
    }
}

// IndexedDB 工具类
export class IndexedDBHelper {
    private dbName: string;
    private version: number;
    private db: IDBDatabase | null = null;

    constructor(config: { name: string; version: number }) {
        this.dbName = config.name;
        this.version = config.version;
    }

    /**
     * 打开数据库连接
     */
    async open(): Promise<IDBDatabase> {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.version);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                this.db = request.result;
                resolve(request.result);
            };

            request.onupgradeneeded = (event) => {
                const db = (event.target as IDBOpenDBRequest).result;

                // 创建对象存储
                if (!db.objectStoreNames.contains('playlist')) {
                    const store = db.createObjectStore('playlist', { keyPath: 'uniqueIndex' });
                    store.createIndex('hash', 'hash', { unique: true });
                    store.createIndex('timestamp', 'timestamp', { unique: false });
                }

                if (!db.objectStoreNames.contains('settings')) {
                    db.createObjectStore('settings', { keyPath: 'id' });
                }

                if (!db.objectStoreNames.contains('history')) {
                    const historyStore = db.createObjectStore('history', { keyPath: 'id', autoIncrement: true });
                    historyStore.createIndex('trackId', 'trackId', { unique: false });
                    historyStore.createIndex('timestamp', 'timestamp', { unique: false });
                }
            };
        });
    }

    /**
     * 获取所有数据
     */
    async getAllData(storeName: string): Promise<any[]> {
        await this.ensureConnection();

        return new Promise((resolve, reject) => {
            const transaction = this.db!.transaction([storeName], 'readonly');
            const store = transaction.objectStore(storeName);
            const request = store.getAll();

            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve(request.result);
        });
    }

    /**
     * 更新数据
     */
    async updateData(storeName: string, data: any): Promise<void> {
        await this.ensureConnection();

        return new Promise((resolve, reject) => {
            const transaction = this.db!.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.put(data);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve();
        });
    }

    /**
     * 删除数据
     */
    async deleteData(storeName: string, key: any): Promise<void> {
        await this.ensureConnection();

        return new Promise((resolve, reject) => {
            const transaction = this.db!.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.delete(key);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve();
        });
    }

    /**
     * 确保数据库连接
     */
    private async ensureConnection(): Promise<void> {
        if (!this.db) {
            await this.open();
        }
    }

    /**
     * 关闭数据库连接
     */
    close(): void {
        if (this.db) {
            this.db.close();
            this.db = null;
        }
    }
}