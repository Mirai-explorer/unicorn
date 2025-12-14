// components/MusicPlayer/layouts/ClassicLayout.tsx
/**
 * 经典布局 - 封面在上，歌词在中，信息在下
 */

import React from 'react';
import { usePlayer } from '@/contexts';
import { Cover } from '../components/Cover';
import { TrackInfo } from '../components/TrackInfo';
import { LyricsDisplay } from '../components/LyricsDisplay';
import { ContentArea } from '../styles';

export const ClassicLayout: React.FC = () => {
    const { playlist, ui, settings, audio } = usePlayer();
    const { currentTrack } = playlist;

    return (
        <ContentArea>
            {/* 封面 */}
            <Cover
                imageUrl={currentTrack?.cover}
                isRotating={audio.isPlaying}
                size={settings.coverSize}
                onDoubleClick={ui.showSearch}
            />

            {/* 歌词显示 */}
            <LyricsDisplay
                currentTime={audio.currentTime}
                offset={settings.lyricOffset}
                fontSize={settings.fontSize}
                showLyrics={settings.showLyrics}
            />

            {/* 音轨信息 */}
            <TrackInfo
                title={currentTrack?.title}
                artist={currentTrack?.artist}
                album={currentTrack?.subtitle}
            />
        </ContentArea>
    );
};