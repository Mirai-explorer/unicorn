import { useEffect, useRef, useState, useCallback } from "react";

interface AudioEngineOptions {
    src: string;                     // 音源 URL
    autoplay?: boolean;              // 是否自动播放
    loop?: boolean;                  // 是否循环播放
    volume?: number;                 // 初始音量 0~1
}

export function useAudioEngine({ src, autoplay = false, loop = false, volume = 1 }: AudioEngineOptions) {
    const audioRef = useRef<HTMLAudioElement>(new Audio(src));
    const [isPlaying, setIsPlaying] = useState(autoplay);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isMuted, setIsMuted] = useState(false);

    // 初始化 audio 对象
    useEffect(() => {
        const audio = audioRef.current;
        audio.src = src;
        audio.autoplay = autoplay;
        audio.loop = loop;
        audio.volume = volume;

        const onTimeUpdate = () => setCurrentTime(audio.currentTime);
        const onLoadedMetadata = () => setDuration(audio.duration);
        const onPlay = () => setIsPlaying(true);
        const onPause = () => setIsPlaying(false);
        const onEnded = () => setIsPlaying(false);

        audio.addEventListener("timeupdate", onTimeUpdate);
        audio.addEventListener("loadedmetadata", onLoadedMetadata);
        audio.addEventListener("play", onPlay);
        audio.addEventListener("pause", onPause);
        audio.addEventListener("ended", onEnded);

        return () => {
            audio.pause();
            audio.removeEventListener("timeupdate", onTimeUpdate);
            audio.removeEventListener("loadedmetadata", onLoadedMetadata);
            audio.removeEventListener("play", onPlay);
            audio.removeEventListener("pause", onPause);
            audio.removeEventListener("ended", onEnded);
        };
    }, [src, autoplay, loop, volume]);

    // 控制方法
    const play = useCallback(() => audioRef.current.play(), []);
    const pause = useCallback(() => audioRef.current.pause(), []);
    const seek = useCallback((time: number) => (audioRef.current.currentTime = time), []);
    const setVolumeLevel = useCallback((vol: number) => (audioRef.current.volume = vol), []);
    const mute = useCallback(() => {
        audioRef.current.muted = true;
        setIsMuted(true);
    }, []);
    const unmute = useCallback(() => {
        audioRef.current.muted = false;
        setIsMuted(false);
    }, []);

    return {
        audioRef,
        isPlaying,
        currentTime,
        duration,
        isMuted,
        play,
        pause,
        seek,
        setVolume: setVolumeLevel,
        mute,
        unmute,
    };
}
