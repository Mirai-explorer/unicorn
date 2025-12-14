// utils/initializationUtils.ts
import {StorageHelper} from "@/utils/storageUtils";
import {MusicTrack} from "@/types";

/**
 * 应用初始化工具
 */
export class InitializationUtils {
    /**
     * 初始化播放器数据
     */
    static async initializePlayerData(): Promise<{
        tracks: MusicTrack[] | null;
        settings: any;
        lastState: any;
    }> {
        try {
            const [tracks, settings, lastState] = await Promise.all([
                StorageHelper.get('playlist_tracks', []),
                StorageHelper.get('player_settings', null),
                StorageHelper.get('last_player_state', null)
            ]);

            return { tracks, settings, lastState };
        } catch (error) {
            console.error('初始化播放器数据失败:', error);
            return { tracks: [], settings: null, lastState: null };
        }
    }

    /**
     * 恢复上次播放状态
     */
    static restoreLastState(player: any, lastState: any) {
        if (lastState) {
            const { trackIndex, progress, volume, playbackMode } = lastState;

            if (trackIndex !== undefined) {
                player.playlist.setCurrentTrackIndex(trackIndex);
            }

            if (progress !== undefined) {
                setTimeout(() => {
                    player.audio.seek(progress);
                }, 1000);
            }

            if (volume !== undefined) {
                player.audio.setVolume(volume);
            }

            if (playbackMode !== undefined) {
                player.playlist.setPlaybackMode(playbackMode);
            }
        }
    }
}