import { useEffect } from "react";
import {PlaybackState, QueueManager, Track} from "@/types/player";

export function usePersistentState(playbackState: PlaybackState, queue: QueueManager) {
    // 读取初始状态
    useEffect(() => {
        const savedVolume = localStorage.getItem("volume");
        if (savedVolume) playbackState.setVolume(Number(savedVolume));

        const savedTrack = localStorage.getItem("currentTrack");
        if (savedTrack) playbackState.setCurrentTrack(JSON.parse(savedTrack));

        const savedQueue = localStorage.getItem("queue");
        if (savedQueue) {
            queue.clearQueue();
            const tracks: Track[] = JSON.parse(savedQueue);
            tracks.forEach(track => queue.addTrack(track));
        }

    }, []);

    // 保存状态
    useEffect(() => {
        localStorage.setItem("volume", playbackState.volume.toString());
        if (playbackState.currentTrack)
            localStorage.setItem("currentTrack", JSON.stringify(playbackState.currentTrack));
    }, [playbackState.volume, playbackState.currentTrack]);

    useEffect(() => {
        localStorage.setItem("queue", JSON.stringify(queue.queue));
    }, [queue.queue]);
}