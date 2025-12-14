// contexts/PlayerContext2.tsx
/**
 * 播放器主上下文 - 聚合所有播放器状态
 */

import React, {createContext, ReactNode, useContext, useEffect, useMemo, useRef} from 'react';
import { useAudioPlayback, usePlaylistManager, usePlayerUI, usePlayerSettings, useLyricsManager2,  } from '@/hooks';
import { MusicTrack } from "@/types";
import tracks0 from '@/assets/data/tracks2';

// 聚合所有 Hook 的完整 Store
const usePlayerStore = () => {
    // 初始化所有 Hook
    const playlistManager = usePlaylistManager(tracks0);
    const audioPlayback = useAudioPlayback();
    const playerUI = usePlayerUI();
    const playerSettings = usePlayerSettings();
    const lyricsManager = useLyricsManager2();

    // 跨模块协调逻辑
        const coordinatedActions = useMemo(() => ({
            // 播放特定音轨
            playTrack: (trackId: string) => {
                const success = playlistManager.playTrack(trackId);
                if (success && playlistManager.currentTrack) {
                    audioPlayback.setAudioSource(playlistManager.currentTrack.audioUrl);
                    console.log(`url:`+playlistManager.currentTrack.audioUrl)
                    audioPlayback.play();
                    playerUI.showSuccess(`正在播放: ${playlistManager.currentTrack.title}`);
                }
                return success;
            },

            // 播放音轨对象
            playTrackObject: (track: MusicTrack) => {
                const success = playlistManager.playTrackObject(track);
                if (success && playlistManager.currentTrack) {
                    audioPlayback.setAudioSource(playlistManager.currentTrack.audioUrl);
                    audioPlayback.play();
                }
                return success;
            },

            // 切换播放状态
            togglePlayback: () => {
                const { isPlaying, pause, play, audioRef } = audioPlayback;
                const currentTrack = playlistManager.currentTrack;

                if (isPlaying) {
                    console.log('⏸️ 正在播放，执行暂停');
                    pause();
                } else {
                    console.log('▶️ 暂停状态，执行播放');
                    // 只有当没有音频源时才设置音频源，避免重置进度
                    if (currentTrack && !audioRef.current?.src) {
                        audioPlayback.setAudioSource(currentTrack.audioUrl);
                    }
                    play();
                }
            },

            // 处理音轨结束 - 结合播放模式进行细致处理
            handleTrackEnd: () => {
                const currentPlaybackMode = playlistManager.playbackMode;
                const currentAudio = audioPlayback.audioRef.current;
                
                console.log('🎵 处理 ended 事件 - 播放模式:', currentPlaybackMode);
                
                // 1. 单曲循环模式处理
                if (currentPlaybackMode === 'repeat-one' && currentAudio) {
                    console.log('🔁 单曲循环模式 - 重置播放进度并继续播放');
                    // 无需切换曲目，只需重置播放进度
                    currentAudio.currentTime = 0;
                    
                    // 如果设置了自动播放，直接播放
                    if (playerSettings.autoPlay) {
                        audioPlayback.play();
                    }
                    return;
                }
                
                // 2. 其他播放模式处理
                console.log('🎵 其他播放模式 - 切换到下一首曲目');
                // 调用 playlistManager 的 handleTrackEnd 处理曲目切换
                playlistManager.handleTrackEnd();
                
                // 如果有当前曲目
                if (playlistManager.currentTrack) {
                    // 检查是否需要更新音频源
                    const shouldUpdateSource = !currentAudio || 
                        currentAudio.src !== playlistManager.currentTrack.audioUrl;
                    
                    if (shouldUpdateSource) {
                        console.log('🎵 更新音频源');
                        audioPlayback.setAudioSource(playlistManager.currentTrack.audioUrl);
                    } else {
                        console.log('🎵 音频源未变化，重置播放进度');
                        // 重置播放进度
                        if (currentAudio) {
                            currentAudio.currentTime = 0;
                        }
                    }
                    
                    // 如果设置了自动播放，播放新曲目
                    if (playerSettings.autoPlay) {
                        console.log('▶️ 自动播放新曲目');
                        audioPlayback.play();
                    }
                }
            },

            // 添加到播放列表并播放
            addAndPlay: (track: MusicTrack) => {
                playlistManager.addTrack(track);
                const trackIndex = playlistManager.playlist.length - 1;
                playlistManager.setCurrentTrackIndex(trackIndex);
                audioPlayback.setAudioSource(track.audioUrl);
                audioPlayback.play();
            },

            // 显示错误信息
            showError: (message: string) => {
                playerUI.showError(message);
            },

            // 显示成功信息
            showSuccess: (message: string) => {
                playerUI.showSuccess(message);
            },

            // 重新加载当前音轨
            reloadCurrentTrack: () => {
                if (playlistManager.currentTrack) {
                    audioPlayback.setAudioSource(playlistManager.currentTrack.audioUrl);
                    if (audioPlayback.isPlaying) {
                        audioPlayback.play();
                    }
                }
            }
        }), [audioPlayback, playlistManager, playerUI, playerSettings]);

    // 返回完整的状态接口
    return {
        // 各模块状态
        audio: audioPlayback,
        playlist: playlistManager,
        ui: playerUI,
        settings: playerSettings,
        lyrics: lyricsManager,

        // 协调动作
        actions: coordinatedActions,

        // 便捷访问器
        get currentTrack() {
            return playlistManager.currentTrack;
        },

        get isPlaying() {
            return audioPlayback.isPlaying;
        },

        get isLoading() {
            return audioPlayback.isLoading || playlistManager.isLoading;
        },

        get hasTracks() {
            return playlistManager.playlist.length > 0;
        },

        get progress() {
            return audioPlayback.progressPercentage;
        },

        get volume() {
            return audioPlayback.volume;
        }
    };
};

// 创建 Context
type PlayerContextType = ReturnType<typeof usePlayerStore>;
const PlayerContext2 = createContext<PlayerContextType | null>(null);

// Provider 组件
interface PlayerProviderProps {
    children: ReactNode;
    initialTracks?: MusicTrack[];
}

export const PlayerProvider: React.FC<PlayerProviderProps> = ({
                                                                  children,
                                                                  initialTracks
                                                              }) => {
    const playerStore = usePlayerStore();

    // 同步歌词
    useEffect(() => {
        if (playerStore.currentTrack && playerStore.audio.currentTime > 0) {
            playerStore.lyrics.syncLyrics(playerStore.audio.currentTime);
        }
    }, [playerStore.currentTrack, playerStore.audio.currentTime, playerStore.lyrics]);

    // 当歌曲变化时解析歌词
    useEffect(() => {
        if (playerStore.currentTrack && playerStore.currentTrack.lyrics) {
            // 解析当前歌曲的歌词
            playerStore.lyrics.parseLyrics(playerStore.currentTrack.lyrics);
        }
    }, [playerStore.currentTrack?.id, playerStore.lyrics.parseLyrics]);

    // 同步媒体会话
    const previousTrackIdRef = useRef<string | null>(null);
    const previousTrackIndexRef = useRef<number | null>(null);

    useEffect(() => {
        const currentTrackId = playerStore.currentTrack?.id;

        if (currentTrackId && currentTrackId !== previousTrackIdRef.current) {
            playerStore.ui.showInfo(`当前播放: ${playerStore.currentTrack.title}`);
            previousTrackIdRef.current = currentTrackId;
        }
    }, [playerStore.currentTrack?.id, playerStore.ui.showInfo]);

    // 当 currentTrackIndex 变化时，自动设置音频源并尝试播放
    useEffect(() => {
        // 只有当曲目索引确实变化时才执行
        if (previousTrackIndexRef.current !== playerStore.playlist.currentTrackIndex && playerStore.currentTrack) {
            // 设置新的音频源
            playerStore.audio.setAudioSource(playerStore.currentTrack.audioUrl);
            // 尝试播放（如果设置允许或当前正在播放）
            if (playerStore.audio.isPlaying || playerStore.settings.autoPlay) {
                playerStore.audio.play();
            }
        }
        // 更新之前的曲目索引
        previousTrackIndexRef.current = playerStore.playlist.currentTrackIndex;
    }, [playerStore.playlist.currentTrackIndex, playerStore.currentTrack, playerStore.audio, playerStore.settings.autoPlay]);

    // 监听音频 ended 事件，处理曲目结束逻辑
    useEffect(() => {
        const audioElement = playerStore.audio.audioRef.current;
        
        if (!audioElement) return;
        
        // 曲目结束时的处理函数
        const handleEnded = () => {
            console.log('🎵 音频 ended 事件被触发，调用 handleTrackEnd');
            playerStore.actions.handleTrackEnd();
        };
        
        // 添加 ended 事件监听器
        audioElement.addEventListener('ended', handleEnded);
        
        // 组件卸载时移除监听器
        return () => {
            audioElement.removeEventListener('ended', handleEnded);
        };
    }, [playerStore.audio.audioRef, playerStore.actions.handleTrackEnd]);

    return (
        <PlayerContext2.Provider value={playerStore}>
            {children}
        </PlayerContext2.Provider>
    );
};

// 便捷访问 Hook
export const usePlayer = (): PlayerContextType => {
    const context = useContext(PlayerContext2);
    if (!context) {
        throw new Error('usePlayer must be used within a PlayerProvider');
    }
    return context;
};