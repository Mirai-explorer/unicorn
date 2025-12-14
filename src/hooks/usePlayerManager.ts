import { usePlaybackState } from "./usePlaybackState";
import { usePlaybackActions } from "./usePlaybackActions";
import { useQueueManager } from "./useQueueManager";
import { useAudioEngine } from "./useAudioEngine";
import { useMediaSession } from "./useMediaSession";
import {Track} from "@/types/player";

export function usePlayerManager(initialTrack?: Track) {
    // 底层 Hooks
    const playbackState = usePlaybackState(initialTrack);
    const audioEngine = useAudioEngine({ src: initialTrack?.url || "" });
    const actions = usePlaybackActions({ playbackState, audioEngine });
    const queue = useQueueManager();

    // 注册 MediaSession
    useMediaSession(playbackState, {
        play: () => actions.play(),        // 忽略 track 参数
        pause: actions.pause,
        playNext: actions.next,
        playPrev: actions.prev,
    });

    // 高层动作
    const playNext = () => {
        const nextTrack = queue.getNextTrack(playbackState.currentTrack ?? undefined);
        if (nextTrack) {
            actions.play(nextTrack);
        }
    };

    const playPrev = () => {
        const prevTrack = queue.getPrevTrack(playbackState.currentTrack ?? undefined);
        if (prevTrack) {
            actions.play(prevTrack);
        }
    };

    const togglePlay = () => {
        if (playbackState.isPlaying) actions.pause();
        else actions.play();
    };

    return {
        state: playbackState,
        actions: {
            ...actions,
            playNext,
            playPrev,
            togglePlay
        },
        queue
    };
}
