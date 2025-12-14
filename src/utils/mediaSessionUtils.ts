// utils/mediaSessionUtils.ts
/**
 * Media Session API 工具函数
 */

import { MusicTrack, PlaybackMode } from '@/types';

export class MediaSessionManager {
    private static isSupported = 'mediaSession' in navigator;

    /**
     * 更新媒体会话元数据
     */
    static updateMediaSession(track: MusicTrack | null): void {
        if (!this.isSupported || !track) return;

        try {
            navigator.mediaSession.metadata = new MediaMetadata({
                title: track.title,
                artist: track.artist,
                album: track.subtitle,
                artwork: [
                    {
                        src: track.cover,
                        sizes: '512x512',
                        type: 'image/jpeg'
                    }
                ]
            });
        } catch (error) {
            console.error('更新 MediaSession 元数据失败:', error);
        }
    }

    /**
     * 设置播放状态
     */
    static setPlaybackState(state: 'none' | 'paused' | 'playing'): void {
        if (!this.isSupported) return;

        try {
            navigator.mediaSession.playbackState = state;
        } catch (error) {
            console.error('设置播放状态失败:', error);
        }
    }

    /**
     * 设置播放位置状态
     */
    static setPositionState(
        duration: number,
        position: number = 0,
        playbackRate: number = 1
    ): void {
        if (!this.isSupported || !navigator.mediaSession.setPositionState) return;

        try {
            navigator.mediaSession.setPositionState({
                duration,
                playbackRate,
                position
            });
        } catch (error) {
            console.error('设置播放位置状态失败:', error);
        }
    }

    /**
     * 设置媒体会话操作处理程序
     */
    static setActionHandlers(handlers: {
        play?: () => void;
        pause?: () => void;
        seekbackward?: (details: MediaSessionActionDetails) => void;
        seekforward?: (details: MediaSessionActionDetails) => void;
        previoustrack?: () => void;
        nexttrack?: () => void;
        seekto?: (details: MediaSessionActionDetails) => void;
        stop?: () => void;
    }): void {
        if (!this.isSupported) return;

        try {
            // 清除所有现有的操作处理程序
            const actions: MediaSessionAction[] = [
                'play', 'pause', 'seekbackward', 'seekforward',
                'previoustrack', 'nexttrack', 'seekto', 'stop'
            ];

            actions.forEach(action => {
                navigator.mediaSession.setActionHandler(action, null);
            });

            // 设置新的操作处理程序
            Object.entries(handlers).forEach(([action, handler]) => {
                if (handler) {
                    navigator.mediaSession.setActionHandler(
                        action as MediaSessionAction,
                        handler as () => void
                    );
                }
            });
        } catch (error) {
            console.error('设置 MediaSession 操作处理程序失败:', error);
        }
    }

    /**
     * 设置播放模式指示器
     */
    static setPlaybackMode(mode: PlaybackMode): void {
        if (!this.isSupported) return;

        try {
            // 清除现有的播放模式
            navigator.mediaSession.setActionHandler('nexttrack', null);
            navigator.mediaSession.setActionHandler('previoustrack', null);

            switch (mode) {
                case 'repeat-one':
                    // 单曲循环模式下禁用下一首/上一首
                    break;
                case 'shuffle':
                    // 随机播放模式下保持默认行为
                    break;
                case 'sequential':
                default:
                    // 顺序播放模式下保持默认行为
                    break;
            }
        } catch (error) {
            console.error('设置播放模式失败:', error);
        }
    }

    /**
     * 更新播放进度
     */
    static updatePlaybackProgress(
        currentTime: number,
        duration: number,
        isPlaying: boolean
    ): void {
        if (!this.isSupported) return;

        this.setPlaybackState(isPlaying ? 'playing' : 'paused');
        this.setPositionState(duration, currentTime);
    }

    /**
     * 清除媒体会话
     */
    static clearMediaSession(): void {
        if (!this.isSupported) return;

        try {
            navigator.mediaSession.metadata = null;
            this.setPlaybackState('none');

            // 清除所有操作处理程序
            this.setActionHandlers({});
        } catch (error) {
            console.error('清除 MediaSession 失败:', error);
        }
    }

    /**
     * 检查 Media Session API 支持情况
     */
    static checkSupport(): {
        supported: boolean;
        features: {
            metadata: boolean;
            playbackState: boolean;
            positionState: boolean;
            actionHandlers: boolean;
        };
    } {
        const supported = this.isSupported;

        return {
            supported,
            features: {
                metadata: supported && 'metadata' in navigator.mediaSession,
                playbackState: supported && 'playbackState' in navigator.mediaSession,
                positionState: supported && 'setPositionState' in navigator.mediaSession,
                actionHandlers: supported && 'setActionHandler' in navigator.mediaSession
            }
        };
    }

    /**
     * 设置媒体会话图标（实验性功能）
     */
    static setIcons(icons: MediaImage[]): void {
        if (!this.isSupported || !navigator.mediaSession.metadata) return;

        try {
            navigator.mediaSession.metadata.artwork = icons;
        } catch (error) {
            console.error('设置 MediaSession 图标失败:', error);
        }
    }
}