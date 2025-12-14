import { useState, useCallback } from "react";
import {Track} from "@/types/player";

export function useQueueManager(initialQueue: Track[] = []) {
    const [queue, setQueue] = useState<Track[]>(initialQueue);
    const [currentIndex, setCurrentIndex] = useState(0);

    const addTrack = useCallback((track: Track) => setQueue(prev => [...prev, track]), []);
    const removeTrack = useCallback((track: Track) => setQueue(prev => prev.filter(t => t.id !== track.id)), []);

    const getNextTrack = useCallback((currentTrack?: Track) => {
        if (queue.length === 0) return null;
        const idx = currentTrack ? queue.findIndex(t => t.id === currentTrack.id) : currentIndex;
        const nextIndex = (idx + 1) % queue.length;
        setCurrentIndex(nextIndex);
        return queue[nextIndex];
    }, [queue, currentIndex]);

    const getPrevTrack = useCallback((currentTrack?: Track) => {
        if (queue.length === 0) return null;
        const idx = currentTrack ? queue.findIndex(t => t.id === currentTrack.id) : currentIndex;
        const prevIndex = (idx - 1 + queue.length) % queue.length;
        setCurrentIndex(prevIndex);
        return queue[prevIndex];
    }, [queue, currentIndex]);

    const clearQueue = useCallback(() => { setQueue([]); setCurrentIndex(0); }, []);

    return { queue, currentIndex, addTrack, removeTrack, getNextTrack, getPrevTrack, clearQueue };
}