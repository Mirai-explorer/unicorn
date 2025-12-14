// utils/audioUtils.ts
/**
 * 音频相关工具函数
 */

import { PlaybackError, QualityLevel, AudioFormat } from '@/types';

// 声明非标准属性 webkitAudioContext
declare global {
    interface Window {
        webkitAudioContext?: typeof AudioContext;
    }
}

export class AudioUtils {
    /**
     * 处理音频播放错误
     */
    static handlePlayError(error: unknown): PlaybackError {
        const errorMessage = error instanceof Error ? error.message : String(error);

        if (errorMessage.includes('user didn\'t interact') || errorMessage.includes('user gesture')) {
            return {
                type: 'permission_error',
                message: '请手动点击播放按钮',
                code: 1001,
                timestamp: Date.now(),
                recoverable: false
            };
        }

        if (errorMessage.includes('network error') || errorMessage.includes('Failed to fetch')) {
            return {
                type: 'network_error',
                message: '网络错误，请检查网络连接',
                code: 1002,
                timestamp: Date.now(),
                recoverable: true
            };
        }

        if (errorMessage.includes('format') || errorMessage.includes('codec')) {
            return {
                type: 'format_error',
                message: '音频格式不支持',
                code: 1003,
                timestamp: Date.now(),
                recoverable: false
            };
        }

        if (errorMessage.includes('decode')) {
            return {
                type: 'decode_error',
                message: '音频解码失败',
                code: 1004,
                timestamp: Date.now(),
                recoverable: false
            };
        }

        return {
            type: 'unknown_error',
            message: `播放错误: ${errorMessage}`,
            code: 9999,
            timestamp: Date.now(),
            recoverable: false
        };
    }

    /**
     * 计算音频缓冲进度
     */
    static calculateBufferedProgress(audio: HTMLAudioElement): number {
        if (!audio.buffered.length || !audio.duration) return 0;

        const bufferedEnd = audio.buffered.end(audio.buffered.length - 1);
        return (bufferedEnd / audio.duration) * 100;
    }

    /**
     * 获取支持的音频格式
     */
    static getSupportedFormats(): AudioFormat[] {
        const audio = document.createElement('audio');
        const formats: AudioFormat[] = [];

        if (audio.canPlayType('audio/mpeg')) formats.push('mp3');
        if (audio.canPlayType('audio/flac')) formats.push('flac');
        if (audio.canPlayType('audio/wav')) formats.push('wav');
        if (audio.canPlayType('audio/aac')) formats.push('aac');
        if (audio.canPlayType('audio/ogg')) formats.push('ogg');

        return formats;
    }

    /**
     * 根据质量等级获取推荐比特率
     */
    static getBitrateForQuality(quality: QualityLevel): number {
        const bitrates = {
            low: 128000,
            medium: 192000,
            high: 320000,
            lossless: 1411000
        };

        return bitrates[quality];
    }

    /**
     * 计算音频文件大小
     */
    static calculateFileSize(duration: number, bitrate: number): number {
        // 文件大小 (bytes) = 时长(秒) × 比特率(bps) / 8
        return Math.round((duration * bitrate) / 8);
    }

    /**
     * 格式化文件大小
     */
    static formatFileSize(bytes: number): string {
        const units = ['B', 'KB', 'MB', 'GB'];
        let size = bytes;
        let unitIndex = 0;

        while (size >= 1024 && unitIndex < units.length - 1) {
            size /= 1024;
            unitIndex++;
        }

        return `${size.toFixed(1)} ${units[unitIndex]}`;
    }

    /**
     * 生成音频频谱数据（模拟）
     */
    static generateSpectrumData(bands: number = 32): number[] {
        return Array.from({ length: bands }, () => Math.random() * 100);
    }

    /**
     * 应用音频淡入淡出
     */
    static async applyFade(audio: HTMLAudioElement, type: 'in' | 'out', duration: number = 1000): Promise<void> {
        const steps = 20;
        const stepDuration = duration / steps;

        for (let i = 0; i <= steps; i++) {
            const progress = i / steps;
            const volume = type === 'in' ? progress : 1 - progress;

            audio.volume = Math.max(0, Math.min(1, volume));
            await new Promise(resolve => setTimeout(resolve, stepDuration));
        }
    }



    /**
     * 检查是否支持 Web Audio API
     */
    static isWebAudioSupported(): boolean {
        return !!(window.AudioContext || window.webkitAudioContext);
    }

    /**
     * 创建音频上下文
     */
    static createAudioContext(): AudioContext | null {
        if (this.isWebAudioSupported()) {
            return new (window.AudioContext || window.webkitAudioContext)();
        }
        return null;
    }
}