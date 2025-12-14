// hooks/usePlaylistManager.ts
import { useState, useRef, useCallback, useMemo } from 'react';
import { MusicTrack, PlaybackMode, PlaylistHistory } from '@/types';
import { StorageHelper, AudioUtils } from '@/utils';

export const usePlaylistManager = (initialTracks: MusicTrack[] = []) => {
    // 🎯 播放列表数据
    const [playlist, setPlaylistState] = useState<MusicTrack[]>(initialTracks);
    const [currentTrackIndex, setCurrentTrackIndexState] = useState(0);
    const [playbackMode, setPlaybackModeState] = useState<PlaybackMode>('sequential');

    // 🎯 播放队列和历史
    const [upNextQueue, setUpNextQueue] = useState<MusicTrack[]>([]);
    const [playHistory, setPlayHistory] = useState<PlaylistHistory[]>([]);
    const [shuffledIndexes, setShuffledIndexes] = useState<number[]>([]);

    // 🎯 加载和操作状态
    const [isLoading, setIsLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedTracks, setSelectedTracks] = useState<Set<number>>(new Set());
    const [lastOperation, setLastOperation] = useState<{ type: string; count: number } | null>(null);

    const originalPlaylistOrder = useRef<MusicTrack[]>(initialTracks);
    const operationHistory = useRef<{ action: string; data: any; timestamp: number }[]>([]);

    // 🎯 当前音轨（计算属性）
    const currentTrack = useMemo(() => {
        if (playbackMode === 'shuffle' && shuffledIndexes.length > 0) {
            const actualIndex = shuffledIndexes[currentTrackIndex];
            return playlist[actualIndex] || null;
        }
        return playlist[currentTrackIndex] || null;
    }, [playlist, currentTrackIndex, playbackMode, shuffledIndexes]);

    // 🎯 切换音轨
    const setCurrentTrackIndex = useCallback((index: number) => {
        if (index >= 0 && index < playlist.length) {
            // 记录播放历史
            if (currentTrack) {
                setPlayHistory(prev => [...prev, {
                    track: currentTrack,
                    playedAt: Date.now(),
                    position: currentTrackIndex
                }]);
            }

            setCurrentTrackIndexState(index);
            setLastOperation({ type: 'track_change', count: 1 });
        }
    }, [playlist.length, currentTrack, currentTrackIndex]);

    // 🎯 直接播放特定音轨
    const playTrack = useCallback((trackId: string) => {
        const trackIndex = playlist.findIndex(track => track.id === trackId);
        if (trackIndex !== -1) {
            setCurrentTrackIndex(trackIndex);
            return true;
        }
        return false;
    }, [playlist, setCurrentTrackIndex]);

    // 🎯 通过音轨对象播放
    const playTrackObject = useCallback((track: MusicTrack) => {
        const trackIndex = playlist.findIndex(t => t.id === track.id);
        if (trackIndex !== -1) {
            setCurrentTrackIndex(trackIndex);
            return true;
        }
        return false;
    }, [playlist, setCurrentTrackIndex]);

    // 🎯 下一首
    const nextTrack = useCallback(() => {
        switch (playbackMode) {
            case 'sequential':
                // 顺序播放：到末尾时停止（不循环）
                if (currentTrackIndex < playlist.length - 1) {
                    setCurrentTrackIndex(currentTrackIndex + 1);
                }
                break;

            case 'repeat-all':
            case 'shuffle':
                // 列表循环和随机播放：始终可以播放下一首
                if (playbackMode === 'shuffle' && shuffledIndexes.length > 0) {
                    // 随机模式：使用打乱后的索引列表
                    const nextIndex = (currentTrackIndex + 1) % shuffledIndexes.length;
                    setCurrentTrackIndexState(nextIndex);
                } else {
                    // 列表循环模式：正常循环
                    setCurrentTrackIndex((currentTrackIndex + 1) % playlist.length);
                }
                break;

            case 'repeat-one':
                // 单曲循环，不改变索引
                break;
        }
    }, [playbackMode, currentTrackIndex, playlist.length, shuffledIndexes, setCurrentTrackIndex]);

    // 🎯 上一首
    const previousTrack = useCallback(() => {
        switch (playbackMode) {
            case 'sequential':
                // 顺序播放：回到开头时停止（不循环）
                if (currentTrackIndex > 0) {
                    setCurrentTrackIndex(currentTrackIndex - 1);
                }
                break;

            case 'repeat-all':
            case 'shuffle':
                // 列表循环和随机播放：始终可以播放上一首
                if (playbackMode === 'shuffle' && shuffledIndexes.length > 0) {
                    // 随机模式：使用打乱后的索引列表
                    const prevIndex = currentTrackIndex === 0 ? shuffledIndexes.length - 1 : currentTrackIndex - 1;
                    setCurrentTrackIndexState(prevIndex);
                } else {
                    // 列表循环模式：正常循环
                    const prevIndex = currentTrackIndex === 0 ? playlist.length - 1 : currentTrackIndex - 1;
                    setCurrentTrackIndex(prevIndex);
                }
                break;

            case 'repeat-one':
                // 单曲循环，回到开头
                setCurrentTrackIndex(currentTrackIndex);
                break;
        }
    }, [playbackMode, currentTrackIndex, playlist.length, shuffledIndexes, setCurrentTrackIndex]);

    // 🎯 随机播放
    const playRandomTrack = useCallback(() => {
        const randomIndex = Math.floor(Math.random() * playlist.length);
        setCurrentTrackIndex(randomIndex);
    }, [playlist.length, setCurrentTrackIndex]);

    // 🎯 切换播放模式
    const setPlaybackMode = useCallback((mode: PlaybackMode) => {
        setPlaybackModeState(mode);

        // 如果是随机模式，生成随机索引
        if (mode === 'shuffle') {
            const indexes = [...Array(playlist.length).keys()];
            // Fisher-Yates 洗牌算法
            for (let i = indexes.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [indexes[i], indexes[j]] = [indexes[j], indexes[i]];
            }
            setShuffledIndexes(indexes);
            // 不再立即切换曲目，保持当前曲目播放
            // 新的随机顺序将在当前曲目结束后生效
        }
    }, [playlist.length]);

    // 🎯 添加音轨
    const addTrack = useCallback((track: MusicTrack) => {
        setPlaylistState(prev => [...prev, track]);
        setLastOperation({ type: 'add_track', count: 1 });

        // 记录操作历史
        operationHistory.current.push({
            action: 'ADD_TRACK',
            data: track,
            timestamp: Date.now()
        });
    }, []);

    // 🎯 批量添加音轨
    const addTracks = useCallback((tracks: MusicTrack[]) => {
        setPlaylistState(prev => [...prev, ...tracks]);
        setLastOperation({ type: 'add_tracks', count: tracks.length });
    }, []);

    // 🎯 删除音轨
    const removeTrack = useCallback((index: number) => {
        setPlaylistState(prev => {
            const newPlaylist = [...prev];
            const removedTrack = newPlaylist.splice(index, 1)[0];

            // 记录操作历史
            operationHistory.current.push({
                action: 'REMOVE_TRACK',
                data: removedTrack,
                timestamp: Date.now()
            });

            return newPlaylist;
        });

        setLastOperation({ type: 'remove_track', count: 1 });

        // 如果删除的是当前播放的音轨，自动播放下一首
        if (index === currentTrackIndex) {
            nextTrack();
        } else if (index < currentTrackIndex) {
            // 如果删除的是当前播放音轨之前的音轨，调整当前索引
            setCurrentTrackIndexState(currentTrackIndex - 1);
        }
    }, [currentTrackIndex, nextTrack]);

    // 🎯 批量删除音轨
    const removeTracks = useCallback((indexes: number[]) => {
        setPlaylistState(prev => {
            const newPlaylist = prev.filter((_, index) => !indexes.includes(index));
            return newPlaylist;
        });

        setLastOperation({ type: 'remove_tracks', count: indexes.length });

        // 处理当前播放索引
        const sortedIndexes = [...indexes].sort((a, b) => a - b);
        let newCurrentIndex = currentTrackIndex;

        for (const index of sortedIndexes) {
            if (index === newCurrentIndex) {
                // 如果删除了当前播放的音轨
                newCurrentIndex = Math.min(newCurrentIndex, playlist.length - indexes.length - 1);
                setCurrentTrackIndexState(newCurrentIndex);
            } else if (index < newCurrentIndex) {
                newCurrentIndex--;
            }
        }

        setCurrentTrackIndexState(newCurrentIndex);
    }, [currentTrackIndex, playlist.length]);

    // 🎯 移动音轨位置
    const moveTrack = useCallback((fromIndex: number, toIndex: number) => {
        setPlaylistState(prev => {
            const newPlaylist = [...prev];
            const [movedTrack] = newPlaylist.splice(fromIndex, 1);
            newPlaylist.splice(toIndex, 0, movedTrack);
            return newPlaylist;
        });

        // 更新当前播放索引
        if (fromIndex === currentTrackIndex) {
            setCurrentTrackIndexState(toIndex);
        } else if (fromIndex < currentTrackIndex && toIndex >= currentTrackIndex) {
            setCurrentTrackIndexState(currentTrackIndex - 1);
        } else if (fromIndex > currentTrackIndex && toIndex <= currentTrackIndex) {
            setCurrentTrackIndexState(currentTrackIndex + 1);
        }
    }, [currentTrackIndex]);

    // 🎯 清空播放列表
    const clearPlaylist = useCallback(() => {
        setPlaylistState([]);
        setCurrentTrackIndexState(0);
        setUpNextQueue([]);
        setLastOperation({ type: 'clear_playlist', count: playlist.length });
    }, [playlist.length]);

    // 🎯 添加到下一首播放
    const addToUpNext = useCallback((track: MusicTrack) => {
        setUpNextQueue(prev => [...prev, track]);
        setLastOperation({ type: 'add_to_upnext', count: 1 });
    }, []);

    // 🎯 批量添加到下一首播放
    const addTracksToUpNext = useCallback((tracks: MusicTrack[]) => {
        setUpNextQueue(prev => [...prev, ...tracks]);
        setLastOperation({ type: 'add_tracks_to_upnext', count: tracks.length });
    }, []);

    // 🎯 从队列中移除
    const removeFromUpNext = useCallback((index: number) => {
        setUpNextQueue(prev => {
            const newQueue = [...prev];
            newQueue.splice(index, 1);
            return newQueue;
        });
    }, []);

    // 🎯 清空播放队列
    const clearUpNextQueue = useCallback(() => {
        setUpNextQueue([]);
    }, []);

    // 🎯 播放下一首时处理队列
    const handleTrackEnd = useCallback(() => {
        if (upNextQueue.length > 0) {
            // 优先播放队列中的音轨
            const [nextTrack, ...remainingQueue] = upNextQueue;
            setUpNextQueue(remainingQueue);

            // 将队列音轨插入到播放列表中当前音轨后面
            setPlaylistState(prev => {
                const newPlaylist = [...prev];
                newPlaylist.splice(currentTrackIndex + 1, 0, nextTrack);
                return newPlaylist;
            });

            // 播放这个音轨
            setCurrentTrackIndex(currentTrackIndex + 1);
        } else {
            // 正常播放下一首
            nextTrack();
        }
    }, [upNextQueue, currentTrackIndex, nextTrack]);

    // 🎯 选择音轨
    const selectTrack = useCallback((index: number) => {
        setSelectedTracks(prev => new Set(prev).add(index));
    }, []);

    // 🎯 取消选择音轨
    const deselectTrack = useCallback((index: number) => {
        setSelectedTracks(prev => {
            const newSet = new Set(prev);
            newSet.delete(index);
            return newSet;
        });
    }, []);

    // 🎯 切换选择状态
    const toggleTrackSelection = useCallback((index: number) => {
        setSelectedTracks(prev => {
            const newSet = new Set(prev);
            if (newSet.has(index)) {
                newSet.delete(index);
            } else {
                newSet.add(index);
            }
            return newSet;
        });
    }, []);

    // 🎯 选择所有音轨
    const selectAllTracks = useCallback(() => {
        setSelectedTracks(new Set(playlist.map((_, index) => index)));
    }, [playlist.length]);

    // 🎯 取消选择所有音轨
    const deselectAllTracks = useCallback(() => {
        setSelectedTracks(new Set());
    }, []);

    // 🎯 进入编辑模式
    const startEditing = useCallback(() => {
        setIsEditing(true);
    }, []);

    // 🎯 退出编辑模式
    const stopEditing = useCallback(() => {
        setIsEditing(false);
        setSelectedTracks(new Set());
    }, []);

    // 🎯 删除选中的音轨
    const removeSelectedTracks = useCallback(() => {
        const indexesToRemove = Array.from(selectedTracks);
        removeTracks(indexesToRemove);
        setSelectedTracks(new Set());
    }, [selectedTracks, removeTracks]);

    // 🎯 导入播放列表
    const importPlaylist = useCallback(async (file: File) => {
        setIsLoading(true);

        try {
            const text = await file.text();
            const importedData = JSON.parse(text);

            if (Array.isArray(importedData.tracks)) {
                setPlaylistState(importedData.tracks);
                setLastOperation({ type: 'import_playlist', count: importedData.tracks.length });
                return true;
            }
            return false;
        } catch (error) {
            console.error('导入播放列表失败:', error);
            return false;
        } finally {
            setIsLoading(false);
        }
    }, []);

    // 🎯 导出播放列表
    const exportPlaylist = useCallback(() => {
        const exportData = {
            tracks: playlist,
            exportDate: new Date().toISOString(),
            totalTracks: playlist.length,
            version: '1.0'
        };

        const blob = new Blob([JSON.stringify(exportData, null, 2)], {
            type: 'application/json'
        });

        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `playlist-${new Date().getTime()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }, [playlist]);

    // 🎯 保存播放列表到本地存储
    const savePlaylistToStorage = useCallback(async () => {
        try {
            await StorageHelper.set('current_playlist', {
                tracks: playlist,
                currentIndex: currentTrackIndex,
                playbackMode,
                timestamp: Date.now()
            });
        } catch (error) {
            console.error('保存播放列表失败:', error);
        }
    }, [playlist, currentTrackIndex, playbackMode]);

    // 🎯 从本地存储加载播放列表
    const loadPlaylistFromStorage = useCallback(async () => {
        try {
            const saved: {
                tracks: MusicTrack[];
                currentIndex: number;
                playbackMode: PlaybackMode;
                timestamp: number
            } | null = await StorageHelper.get('current_playlist');
            if (saved?.tracks) {
                setPlaylistState(saved.tracks);
                setCurrentTrackIndexState(saved.currentIndex || 0);
                setPlaybackModeState(saved.playbackMode || 'sequential');
                return true;
            }
            return false;
        } catch (error) {
            console.error('加载播放列表失败:', error);
            return false;
        }
    }, []);

    return {
        // === 状态 ===
        // 播放列表数据
        playlist,
        currentTrackIndex,
        currentTrack,
        playbackMode,

        // 队列和历史
        upNextQueue,
        playHistory,

        // 操作状态
        isLoading,
        isEditing,
        selectedTracks,
        lastOperation,

        // === 控制方法 ===
        // 音轨播放控制
        setCurrentTrackIndex,
        playTrack,
        playTrackObject,
        nextTrack,
        previousTrack,
        playRandomTrack,
        setPlaybackMode,

        // 播放列表操作
        setPlaylist: setPlaylistState,
        addTrack,
        addTracks,
        removeTrack,
        removeTracks,
        moveTrack,
        clearPlaylist,

        // 队列管理
        addToUpNext,
        addTracksToUpNext,
        removeFromUpNext,
        clearUpNextQueue,
        handleTrackEnd,

        // 选择和编辑
        selectTrack,
        deselectTrack,
        toggleTrackSelection,
        selectAllTracks,
        deselectAllTracks,
        startEditing,
        stopEditing,
        removeSelectedTracks,

        // 导入导出
        importPlaylist,
        exportPlaylist,
        savePlaylistToStorage,
        loadPlaylistFromStorage,

        // === 计算属性 ===
        get totalTracks() {
            return playlist.length;
        },

        get hasTracks() {
            return playlist.length > 0;
        },

        get selectedCount() {
            return selectedTracks.size;
        },

        get isLastTrack() {
            return currentTrackIndex === playlist.length - 1;
        },

        get isFirstTrack() {
            return currentTrackIndex === 0;
        },

        get progressInPlaylist() {
            return playlist.length > 0 ? (currentTrackIndex / playlist.length) * 100 : 0;
        },

        // === 工具方法 ===
        findTrackIndex: (trackId: string) => playlist.findIndex(track => track.id === trackId),
        getTrackByIndex: (index: number) => playlist[index],

        // === 状态检查 ===
        get canPlayNext() {
            return playlist.length > 1 || upNextQueue.length > 0;
        },

        get canPlayPrevious() {
            return currentTrackIndex > 0 || playHistory.length > 0;
        },

        get isPlaylistModified() {
            return JSON.stringify(playlist) !== JSON.stringify(originalPlaylistOrder.current);
        }
    };
};