import { useState, useCallback } from "react";
import {Track} from "@/types/player";

export function usePlaybackState(initialTrack?: Track) {
    const [currentTrack, setCurrentTrack] = useState<Track | null>(initialTrack || null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const [playMode, setPlayMode] = useState<"loop" | "shuffle" | "single">("loop");
    const [currentTime, setCurrentTime] = useState(0);

    const updateCurrentTime = useCallback((time: number) => setCurrentTime(time), []);

    return {
        currentTrack,
        setCurrentTrack,
        isPlaying,
        setIsPlaying,
        volume,
        setVolume,
        playMode,
        setPlayMode,
        currentTime,
        updateCurrentTime,
    };
}