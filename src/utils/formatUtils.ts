// utils/formatUtils.ts
/**
 * 格式化工具函数
 */

export class FormatUtils {
    /**
     * 格式化数字（添加千位分隔符）
     */
    static formatNumber(num: number): string {
        return new Intl.NumberFormat().format(num);
    }

    /**
     * 格式化文件大小
     */
    static formatFileSize(bytes: number, decimals: number = 2): string {
        if (bytes === 0) return '0 B';

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    /**
     * 格式化比特率
     */
    static formatBitrate(bps: number): string {
        if (bps < 1000) return `${bps} bps`;
        if (bps < 1000000) return `${(bps / 1000).toFixed(1)} kbps`;
        return `${(bps / 1000000).toFixed(1)} mbps`;
    }

    /**
     * 格式化百分比
     */
    static formatPercent(value: number, total: number, decimals: number = 1): string {
        if (total === 0) return '0%';
        const percent = (value / total) * 100;
        return `${percent.toFixed(decimals)}%`;
    }

    /**
     * 格式化时间范围
     */
    static formatTimeRange(start: number, end: number): string {
        return `${this.formatTime(start)} - ${this.formatTime(end)}`;
    }

    /**
     * 格式化时间（秒 → MM:SS）
     */
    static formatTime(seconds: number): string {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    /**
     * 格式化日期时间
     */
    static formatDateTime(
        timestamp: number,
        format: 'full' | 'short' | 'time' | 'date' = 'short'
    ): string {
        const date = new Date(timestamp);

        switch (format) {
            case 'full':
                return date.toLocaleString();
            case 'short':
                return date.toLocaleDateString();
            case 'time':
                return date.toLocaleTimeString();
            case 'date':
                return date.toLocaleDateString();
            default:
                return date.toLocaleString();
        }
    }

    /**
     * 格式化持续时间（秒 → X小时Y分钟Z秒）
     */
    static formatDuration(seconds: number): string {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);

        const parts = [];
        if (hours > 0) parts.push(`${hours}小时`);
        if (minutes > 0) parts.push(`${minutes}分钟`);
        if (secs > 0 || parts.length === 0) parts.push(`${secs}秒`);

        return parts.join('');
    }

    /**
     * 格式化频率（Hz → kHz/MHz）
     */
    static formatFrequency(hz: number): string {
        if (hz < 1000) return `${hz} Hz`;
        if (hz < 1000000) return `${(hz / 1000).toFixed(1)} kHz`;
        return `${(hz / 1000000000).toFixed(2)} MHz`;
    }

    /**
     * 格式化颜色值
     */
    static formatColor(color: string): string {
        // 简化颜色值，如 #ff0000 → #f00
        if (/^#([0-9a-f]{6})$/i.test(color)) {
            const hex = color.slice(1);
            if (hex[0] === hex[1] && hex[2] === hex[3] && hex[4] === hex[5]) {
                return `#${hex[0]}${hex[2]}${hex[4]}`;
            }
        }
        return color;
    }

    /**
     * 格式化文件名（移除非法字符）
     */
    static formatFileName(name: string): string {
        return name.replace(/[<>:"/\\|?*]/g, '_');
    }

    /**
     * 格式化艺术家人名（处理多个艺术家）
     */
    static formatArtists(artists: string | string[]): string {
        if (Array.isArray(artists)) {
            return artists.join('、');
        }
        return artists;
    }

    /**
     * 格式化音轨标题（移除冗余信息）
     */
    static formatTrackTitle(title: string): string {
        // 移除常见的冗余后缀
        return title
            .replace(/\s*\(.*?\)\s*$/g, '')  // 移除括号内容
            .replace(/\s*-\s*.*?$/, '')      // 移除破折号后的内容
            .replace(/\s*\.(mp3|flac|wav|aac|ogg)$/i, '') // 移除文件扩展名
            .trim();
    }

    /**
     * 截断文本并添加省略号
     */
    static truncateText(text: string, maxLength: number, ellipsis: string = '...'): string {
        if (text.length <= maxLength) return text;

        return text.slice(0, maxLength - ellipsis.length) + ellipsis;
    }

    /**
     * 生成随机 ID
     */
    static generateId(prefix: string = 'id'): string {
        return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * 格式化键盘快捷键
     */
    static formatShortcut(keys: string[]): string {
        return keys
            .map(key => {
                if (key.length === 1) return key.toUpperCase();
                return key;
            })
            .join('+');
    }
}