// hooks/usePlayer.ts
/**
 * 播放器状态聚合 Hook
 * 提供一站式访问所有播放器状态和功能
 */
import { useAudioPlayback } from './useAudioPlayback';
import { usePlaylistManager } from './usePlaylistManager';
import { usePlayerUI } from './usePlayerUI';
import { usePlayerSettings } from './usePlayerSettings';
import { useLyricsManager2 } from './useLyricsManager2';

export const usePlayer = () => {
    const audio = useAudioPlayback();
    const playlist = usePlaylistManager();
    const ui = usePlayerUI();
    const settings = usePlayerSettings();
    const lyrics = useLyricsManager2();

    // 跨模块协调逻辑
    const coordinatedActions = {
        // 播放特定音轨
        playTrack: (trackId: string) => {
            const success = playlist.playTrack(trackId);
            if (success) {
                audio.setAudioSource(playlist.currentTrack?.audioUrl || '');
                audio.play();
            }
            return success;
        },

        // 切换播放状态
        togglePlayback: () => {
            if (audio.isPlaying) {
                audio.pause();
            } else {
                // 只有当没有音频源时才设置音频源，避免重置进度
                if (playlist.currentTrack && !audio.audioRef.current?.src) {
                    audio.setAudioSource(playlist.currentTrack.audioUrl);
                }
                audio.play();
            }
        },

        // 处理音轨结束
        handleTrackEnd: () => {
            playlist.handleTrackEnd();
            if (playlist.currentTrack) {
                audio.setAudioSource(playlist.currentTrack.audioUrl);
                if (settings.autoPlay) {
                    audio.play();
                }
            }
        },

        // 显示错误提示
        showError: (message: string) => {
            ui.showError(message);
        }
    };

    return {
        // 各模块状态
        audio,
        playlist,
        ui,
        settings,
        lyrics,

        // 协调动作
        actions: coordinatedActions,

        // 便捷访问
        get currentTrack() {
            return playlist.currentTrack;
        },

        get isPlaying() {
            return audio.isPlaying;
        },

        get isLoading() {
            return audio.isLoading || playlist.isLoading;
        }
    };
};

export type PlayerHookReturn = ReturnType<typeof usePlayer>;