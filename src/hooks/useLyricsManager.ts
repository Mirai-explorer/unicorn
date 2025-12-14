import { useEffect, useState } from "react";
import {Track} from "@/types/player";

interface LyricLine {
    time: number; // 秒
    text: string;
}

export function useLyricsManager(
    currentTrack: Track | null,
    currentTime: number,
    playbackActions: { seek: (time: number) => void }
) {
    const [lyrics, setLyrics] = useState<LyricLine[]>([]);
    const [currentLineIndex, setCurrentLineIndex] = useState(0);

    useEffect(() => {
        if (!currentTrack) return;
        fetchLyrics(currentTrack.id).then(setLyrics);
    }, [currentTrack]);

    useEffect(() => {
        if (!lyrics.length) return;
        const index = lyrics.findIndex(line => line.time > currentTime) - 1;
        setCurrentLineIndex(index >= 0 ? index : 0);
    }, [currentTime, lyrics]);

    // 新增方法：点击歌词跳转
    const seekToLine = (index: number) => {
        const line = lyrics[index];
        if (line) playbackActions.seek(line.time);
    };

    return { lyrics, currentLineIndex, seekToLine };
}

async function fetchLyrics(trackId: string): Promise<LyricLine[]> {
    // TODO: 可替换为实际 API
    return [
        { time: 0, text: "开头歌词" },
        { time: 10, text: "下一句" },
    ];
}
