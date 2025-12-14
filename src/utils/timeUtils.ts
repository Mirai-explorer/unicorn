// utils/timeUtils.ts
/**
 * 时间处理工具函数
 */

export class TimeUtils {
    /**
     * 格式化播放时间 (秒 → MM:SS)
     */
    static formatPlaybackTime(seconds: number): string {
        if (!Number.isFinite(seconds) || seconds < 0) {
            return '--:--';
        }

        const totalSeconds = Math.floor(seconds);
        const minutes = Math.floor(totalSeconds / 60);
        const remainingSeconds = totalSeconds % 60;

        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = remainingSeconds.toString().padStart(2, '0');

        return `${formattedMinutes}:${formattedSeconds}`;
    }

    /**
     * 格式化持续时间 (毫秒 → MM:SS)
     */
    static formatDuration(milliseconds: number): string {
        return this.formatPlaybackTime(milliseconds / 1000);
    }

    /**
     * 格式化详细时间 (毫秒 → HH:MM:SS)
     */
    static formatDetailedTime(milliseconds: number): string {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        if (hours > 0) {
            return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }

        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    /**
     * 解析时间字符串 (MM:SS → 秒)
     */
    static parseTimeString(timeString: string): number {
        const parts = timeString.split(':');

        if (parts.length === 2) {
            const minutes = parseInt(parts[0], 10);
            const seconds = parseInt(parts[1], 10);
            return minutes * 60 + seconds;
        }

        if (parts.length === 3) {
            const hours = parseInt(parts[0], 10);
            const minutes = parseInt(parts[1], 10);
            const seconds = parseInt(parts[2], 10);
            return hours * 3600 + minutes * 60 + seconds;
        }

        return 0;
    }

    /**
     * 计算相对时间（几秒前、几分钟前等）
     */
    static getRelativeTime(timestamp: number): string {
        const now = Date.now();
        const diff = now - timestamp;

        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) return `${days}天前`;
        if (hours > 0) return `${hours}小时前`;
        if (minutes > 0) return `${minutes}分钟前`;
        if (seconds > 0) return `${seconds}秒前`;

        return '刚刚';
    }

    /**
     * 格式化日期
     */
    static formatDate(timestamp: number, format: string = 'YYYY-MM-DD'): string {
        const date = new Date(timestamp);

        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');

        return format
            .replace('YYYY', year.toString())
            .replace('MM', month)
            .replace('DD', day)
            .replace('HH', hours)
            .replace('mm', minutes)
            .replace('ss', seconds);
    }

    /**
     * 创建节流函数
     */
    static throttle<T extends (...args: any[]) => any>(
        func: T,
        delay: number
    ): (...args: Parameters<T>) => void {
        let lastCall = 0;
        return (...args: Parameters<T>) => {
            const now = Date.now();
            if (now - lastCall >= delay) {
                lastCall = now;
                func(...args);
            }
        };
    }

    /**
     * 创建防抖函数
     */
    static debounce<T extends (...args: any[]) => any>(
        func: T,
        delay: number
    ): (...args: Parameters<T>) => void {
        let timeoutId: NodeJS.Timeout;
        return (...args: Parameters<T>) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func(...args), delay);
        };
    }

    /**
     * 等待指定时间
     */
    static sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * 计算时间范围
     */
    static getTimeRange(start: number, end: number): string {
        return `${this.formatPlaybackTime(start)} - ${this.formatPlaybackTime(end)}`;
    }
}