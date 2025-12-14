import { useCallback } from "react";
import { usePlaybackState } from "./usePlaybackState";
import { useAudioEngine } from "./useAudioEngine";
import {Track} from "@/types/player";

interface PlaybackActionsProps {
    playbackState: ReturnType<typeof usePlaybackState>;
    audioEngine: ReturnType<typeof useAudioEngine>;
}

export function usePlaybackActions({ playbackState, audioEngine }: PlaybackActionsProps) {
    const play = useCallback((track?: Track) => {
        if (track) playbackState.setCurrentTrack(track);
        audioEngine.play();
        playbackState.setIsPlaying(true);
    }, [audioEngine, playbackState]);

    const pause = useCallback(() => {
        audioEngine.pause();
        playbackState.setIsPlaying(false);
    }, [audioEngine, playbackState]);

    const seek = useCallback((time: number) => {
        audioEngine.seek(time);
        playbackState.updateCurrentTime(time);
    }, [audioEngine, playbackState]);

    const setVolume = useCallback((vol: number) => {
        audioEngine.setVolume(vol);
        playbackState.setVolume(vol);
    }, [audioEngine, playbackState]);

    const next = useCallback(() => {
        // 这里可结合 QueueManager 获取下一首
        console.log("播放下一首");
    }, []);

    const prev = useCallback(() => {
        console.log("播放上一首");
    }, []);

    return { play, pause, seek, setVolume, next, prev };
}
