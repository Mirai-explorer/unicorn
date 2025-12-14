// components/MusicPlayer/layouts/TheaterLayout.tsx
/**
 * 影院布局 - 大封面，大歌词，沉浸式体验
 */

import React from 'react';
import { usePlayer } from '@/contexts';
import { Cover } from '../components/Cover';
import { TrackInfo } from '../components/TrackInfo';
import { LyricsDisplay } from '../components/LyricsDisplay';
import { ContentArea } from '../styles';

export const TheaterLayout: React.FC = () => {
    const { playlist, ui, settings, audio } = usePlayer();
    const { currentTrack } = playlist;

    return (
        <ContentArea style={{ justifyContent: 'center', gap: '3rem' }}>
            {/* 大封面 */}
            <Cover
                imageUrl={currentTrack?.cover}
                isRotating={audio.isPlaying}
                size="xlarge"
                onDoubleClick={ui.showSearch}
                className="theater"
            />

            {/* 大歌词 */}
            <div style={{ width: '100%', maxWidth: '800px' }}>
                <LyricsDisplay
                    currentTime={audio.currentTime}
                    offset={settings.lyricOffset}
                    fontSize={Math.max(24, settings.fontSize + 6)}
                    showLyrics={settings.showLyrics}
                    className="theater"
                />
            </div>

            {/* 简洁信息 */}
            <TrackInfo
                title={currentTrack?.title}
                artist={currentTrack?.artist}
                album={currentTrack?.subtitle}
                className="theater"
            />
        </ContentArea>
    );
};