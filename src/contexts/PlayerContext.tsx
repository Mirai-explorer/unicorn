import { createContext, useContext, ReactNode } from "react";
import { usePlayerManager } from "@/hooks/usePlayerManager";
import { useLyricsManager } from "@/hooks/useLyricsManager";
import { usePersistentState } from "@/hooks/usePersistentState";
import type { PlaybackState, PlaybackActions, QueueManager, LyricsManager } from "@/types/player";

// --------------------
// Context 类型
// --------------------
export interface PlayerContextValue {
    playbackState: PlaybackState;
    playbackActions: PlaybackActions;
    queue: QueueManager;
    lyricsManager: LyricsManager;
}

// --------------------
// Context & Hook
// --------------------
export const PlayerContext = createContext<PlayerContextValue | null>(null);

export const usePlayerContext = () => {
    const context = useContext(PlayerContext);
    if (!context) {
        throw new Error("usePlayerContext must be used within PlayerProvider");
    }
    return context;
};

// --------------------
// Provider
// --------------------
interface PlayerProviderProps {
    children: ReactNode;
}

export const PlayerProvider = ({ children }: PlayerProviderProps) => {
    // 初始化播放器管理器（包括 PlaybackState、AudioEngine、PlaybackActions、Queue）
    const initialTrack = undefined; // 可选，usePersistentState 会覆盖 localStorage 的 currentTrack
    const playerManager = usePlayerManager(initialTrack);
    const { state: playbackState, actions: playbackActions, queue } = playerManager;

    // 歌词管理
    const lyricsManager = useLyricsManager(playbackState.currentTrack, playbackState.currentTime, { seek: playbackActions.seek });

    // 持久化状态（volume、currentTrack、queue）
    usePersistentState(playbackState, queue);

    // Provider 值
    const value: PlayerContextValue = {
        playbackState,
        playbackActions,
        queue,
        lyricsManager: {
            ...lyricsManager,
            goToLine: (index: number) => lyricsManager.seekToLine(index),
            updateCurrentLine: (index: number) => lyricsManager.seekToLine(index)
        }
    };

    return (
        <PlayerContext.Provider value={value}>
            {children}
        </PlayerContext.Provider>
    );
};