// utils/domUtils.ts
/**
 * DOM 操作工具函数
 */

export class DOMUtils {
    /**
     * 安全地添加事件监听器
     */
    static addEventListener(
        element: EventTarget,
        event: string,
        handler: EventListener,
        options?: AddEventListenerOptions
    ): () => void {
        element.addEventListener(event, handler, options);

        // 返回移除监听器的函数
        return () => {
            element.removeEventListener(event, handler, options);
        };
    }

    /**
     * 防抖的事件监听器
     */
    static addDebouncedEventListener(
        element: EventTarget,
        event: string,
        handler: EventListener,
        delay: number = 100
    ): () => void {
        let timeoutId: NodeJS.Timeout;

        const debouncedHandler = (event: Event) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => handler(event), delay);
        };

        return this.addEventListener(element, event, debouncedHandler);
    }

    /**
     * 节流的事件监听器
     */
    static addThrottledEventListener(
        element: EventTarget,
        event: string,
        handler: EventListener,
        delay: number = 100
    ): () => void {
        let lastCall = 0;

        const throttledHandler = (event: Event) => {
            const now = Date.now();
            if (now - lastCall >= delay) {
                lastCall = now;
                handler(event);
            }
        };

        return this.addEventListener(element, event, throttledHandler);
    }

    /**
     * 检测元素是否在视口中
     */
    static isElementInViewport(element: Element): boolean {
        const rect = element.getBoundingClientRect();

        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    /**
     * 滚动元素到视图中
     */
    static scrollIntoView(
        element: Element,
        options: ScrollIntoViewOptions = { behavior: 'smooth', block: 'center' }
    ): void {
        const htmlElement = element as HTMLElement;

        if (typeof htmlElement.scrollIntoView === 'function') {
            htmlElement.scrollIntoView(options);
        } else {
            // 手动回退逻辑
            element.scrollIntoView();
        }
    }

    /**
     * 获取元素的所有样式
     */
    static getComputedStyles(element: Element): CSSStyleDeclaration {
        return window.getComputedStyle(element);
    }

    /**
     * 设置 CSS 变量
     */
    static setCSSVariable(name: string, value: string, element: HTMLElement = document.documentElement): void {
        element.style.setProperty(`--${name}`, value);
    }

    /**
     * 获取 CSS 变量值
     */
    static getCSSVariable(name: string, element: HTMLElement = document.documentElement): string {
        return getComputedStyle(element).getPropertyValue(`--${name}`).trim();
    }

    /**
     * 添加 CSS 样式
     */
    static injectCSS(css: string, id?: string): HTMLStyleElement {
        const style = document.createElement('style');
        if (id) style.id = id;
        style.textContent = css;
        document.head.appendChild(style);
        return style;
    }

    /**
     * 移除 CSS 样式
     */
    static removeCSS(id: string): void {
        const style = document.getElementById(id);
        if (style && style.tagName === 'STYLE') {
            style.remove();
        }
    }

    /**
     * 创建元素
     */
    static createElement<T extends keyof HTMLElementTagNameMap>(
        tag: T,
        attributes: Record<string, any> = {},
        children: (Node | string)[] = []
    ): HTMLElementTagNameMap[T] {
        const element = document.createElement(tag);

        // 设置属性
        Object.entries(attributes).forEach(([key, value]) => {
            if (key === 'className') {
                element.className = value;
            } else if (key === 'style' && typeof value === 'object') {
                Object.assign(element.style, value);
            } else if (key.startsWith('on') && typeof value === 'function') {
                const eventName = key.slice(2).toLowerCase();
                element.addEventListener(eventName, value);
            } else {
                element.setAttribute(key, value);
            }
        });

        // 添加子元素
        children.forEach(child => {
            if (typeof child === 'string') {
                element.appendChild(document.createTextNode(child));
            } else {
                element.appendChild(child);
            }
        });

        return element;
    }

    /**
     * 测量文本宽度
     */
    static measureTextWidth(text: string, font: string = '14px system-ui'): number {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        if (!context) return 0;

        context.font = font;
        return context.measureText(text).width;
    }

    /**
     * 复制文本到剪贴板
     */
    static async copyToClipboard(text: string): Promise<boolean> {
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(text);
                return true;
            } else {
                // 回退方案
                const textArea = document.createElement('textarea');
                textArea.value = text;
                textArea.style.position = 'fixed';
                textArea.style.opacity = '0';
                document.body.appendChild(textArea);
                textArea.select();
                const successful = document.execCommand('copy');
                document.body.removeChild(textArea);
                return successful;
            }
        } catch (error) {
            console.error('复制到剪贴板失败:', error);
            return false;
        }
    }

    /**
     * 下载文件
     */
    static downloadFile(data: Blob | string, filename: string): void {
        const blob = data instanceof Blob ? data : new Blob([data]);
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.style.display = 'none';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(url);
    }

    /**
     * 全屏操作
     */
    static async toggleFullscreen(element: Element = document.documentElement): Promise<void> {
        if (!document.fullscreenElement) {
            await element.requestFullscreen();
        } else {
            await document.exitFullscreen();
        }
    }

    /**
     * 检测全屏状态
     */
    static isFullscreen(): boolean {
        return !!document.fullscreenElement;
    }

    /**
     * 添加全屏变化监听器
     */
    static onFullscreenChange(handler: (isFullscreen: boolean) => void): () => void {
        const listener = () => {
            handler(this.isFullscreen());
        };

        document.addEventListener('fullscreenchange', listener);

        return () => {
            document.removeEventListener('fullscreenchange', listener);
        };
    }

    /**
     * 阻止事件冒泡和默认行为
     */
    static stopEvent(event: Event): void {
        event.preventDefault();
        event.stopPropagation();
    }

    /**
     * 获取元素在文档中的位置
     */
    static getElementPosition(element: Element): { top: number; left: number } {
        const rect = element.getBoundingClientRect();
        return {
            top: rect.top + window.pageYOffset,
            left: rect.left + window.pageXOffset
        };
    }
}