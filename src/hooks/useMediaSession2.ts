// hooks/useMediaSession2.ts
/**
 * Media Session API Hook
 * 控制操作系统媒体控件和通知
 */
import { useEffect } from 'react';
import { MusicTrack } from '@/types';
import {useAudioPlayback} from "@/hooks/useAudioPlayback";

export const useMediaSession2 = (track: MusicTrack | null, actions: {
    play: () => void;
    pause: () => void;
    nextTrack: () => void;
    previousTrack: () => void;
}) => {
    const audio = useAudioPlayback();
    const isPlaying = audio.isPlaying;
    useEffect(() => {
        if (!('mediaSession' in navigator) || !track) return;

        const { mediaSession } = navigator;

        // 设置媒体元数据
        mediaSession.metadata = new MediaMetadata({
            title: track.title,
            artist: track.artist,
            album: track.subtitle,
            artwork: [
                { src: track.cover, sizes: '512x512', type: 'image/jpeg' }
            ]
        });

        // 设置操作处理程序
        mediaSession.setActionHandler('play', actions.play);
        mediaSession.setActionHandler('pause', actions.pause);
        mediaSession.setActionHandler('previoustrack', actions.previousTrack);
        mediaSession.setActionHandler('nexttrack', actions.nextTrack);

        // 更新播放状态
        mediaSession.playbackState = isPlaying ? 'playing' : 'paused';

        return () => {
            // 清理操作处理程序
            mediaSession.setActionHandler('play', null);
            mediaSession.setActionHandler('pause', null);
            mediaSession.setActionHandler('previoustrack', null);
            mediaSession.setActionHandler('nexttrack', null);
        };
    }, [track, actions]);
};