// utils/validationUtils.ts
import {MusicTrack} from "@/types";

/**
 * 验证工具函数
 */

export class ValidationUtils {
    /**
     * 验证邮箱格式
     */
    static isEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * 验证 URL 格式
     */
    static isURL(url: string): boolean {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }

    /**
     * 验证音频 URL
     */
    static isAudioURL(url: string): boolean {
        if (!this.isURL(url)) return false;

        const audioExtensions = ['.mp3', '.flac', '.wav', '.aac', '.ogg', '.m4a'];
        return audioExtensions.some(ext => url.toLowerCase().includes(ext));
    }

    /**
     * 验证图片 URL
     */
    static isImageURL(url: string): boolean {
        if (!this.isURL(url)) return false;

        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];
        return imageExtensions.some(ext => url.toLowerCase().includes(ext));
    }

    /**
     * 验证数字范围
     */
    static isInRange(value: number, min: number, max: number): boolean {
        return value >= min && value <= max;
    }

    /**
     * 验证必填字段
     */
    static isRequired(value: any): boolean {
        if (value === null || value === undefined) return false;
        if (typeof value === 'string') return value.trim().length > 0;
        if (Array.isArray(value)) return value.length > 0;
        return true;
    }

    /**
     * 验证字符串长度
     */
    static isLength(value: string, min: number, max?: number): boolean {
        if (!this.isRequired(value)) return false;

        const length = value.trim().length;
        if (max !== undefined) {
            return length >= min && length <= max;
        }
        return length >= min;
    }

    /**
     * 验证数字
     */
    static isNumber(value: any): value is number {
        return typeof value === 'number' && !isNaN(value) && isFinite(value);
    }

    /**
     * 验证整数
     */
    static isInteger(value: any): value is number {
        return this.isNumber(value) && Number.isInteger(value);
    }

    /**
     * 验证正数
     */
    static isPositive(value: any): boolean {
        return this.isNumber(value) && value > 0;
    }

    /**
     * 验证非负数
     */
    static isNonNegative(value: any): boolean {
        return this.isNumber(value) && value >= 0;
    }

    /**
     * 验证数组
     */
    static isArray(value: any, minLength: number = 0): value is any[] {
        return Array.isArray(value) && value.length >= minLength;
    }

    /**
     * 验证对象
     */
    static isObject(value: any): value is object {
        return value !== null && typeof value === 'object' && !Array.isArray(value);
    }

    /**
     * 验证函数
     */
    static isFunction<T extends (...args: never[]) => unknown>(value: unknown): value is T {
        return typeof value === 'function';
    }

    /**
     * 验证日期字符串
     */
    static isDateString(value: string): boolean {
        return !isNaN(Date.parse(value));
    }

    /**
     * 验证时间戳
     */
    static isTimestamp(value: any): boolean {
        return this.isNumber(value) && value > 0 && value <= Date.now() + 86400000; // 允许未来1天
    }

    /**
     * 验证颜色值
     */
    static isColor(value: string): boolean {
        // 支持 hex, rgb, rgba, hsl, hsla, 颜色名
        const s = new Option().style;
        s.color = value;
        return s.color !== '';
    }

    /**
     * 验证文件类型
     */
    static isFileType(file: File, allowedTypes: string[]): boolean {
        return allowedTypes.some(type => {
            if (type.startsWith('.')) {
                return file.name.toLowerCase().endsWith(type.toLowerCase());
            }
            return file.type.startsWith(type);
        });
    }

    /**
     * 验证文件大小
     */
    static isFileSize(file: File, maxSizeInMB: number): boolean {
        const maxSize = maxSizeInMB * 1024 * 1024;
        return file.size <= maxSize;
    }

    /**
     * 验证 JSON 字符串
     */
    static isJSON(str: string): boolean {
        try {
            JSON.parse(str);
            return true;
        } catch {
            return false;
        }
    }

    /**
     * 验证 LRC 歌词格式
     */
    static isLRCFormat(text: string): boolean {
        // 简单的 LRC 格式验证
        const lines = text.split('\n');
        const timeTagLines = lines.filter(line => /\[\d+:\d+\.\d+\]/.test(line));
        return timeTagLines.length > 0;
    }

    /**
     * 验证音轨对象
     */
    static isValidTrack(track: MusicTrack): boolean {
        return (
            this.isObject(track) &&
            this.isRequired(track.id) &&
            this.isRequired(track.title) &&
            this.isRequired(track.artist) &&
            this.isRequired(track.audioUrl) &&
            this.isURL(track.audioUrl) &&
            this.isNumber(track.duration) &&
            this.isPositive(track.duration)
        );
    }

    /**
     * 批量验证
     */
    static validateAll(rules: { [key: string]: () => boolean }): { isValid: boolean; errors: string[] } {
        const errors: string[] = [];

        Object.entries(rules).forEach(([field, validator]) => {
            if (!validator()) {
                errors.push(field);
            }
        });

        return {
            isValid: errors.length === 0,
            errors
        };
    }
}