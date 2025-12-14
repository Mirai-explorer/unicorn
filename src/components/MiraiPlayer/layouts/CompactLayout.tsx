// components/MusicPlayer/layouts/CompactLayout.tsx
/**
 * 紧凑布局 - 封面和信息在左侧，歌词在右侧
 */

import React from 'react';
import { usePlayer } from '@/contexts';
import { Cover } from '../components/Cover';
import { TrackInfo } from '../components/TrackInfo';
import { LyricsDisplay } from '../components/LyricsDisplay';
import { HorizontalLayout } from '../styles';

export const CompactLayout: React.FC = () => {
    const { playlist, ui, settings, audio } = usePlayer();
    const { currentTrack } = playlist;

    return (
        <HorizontalLayout>
            {/* 左侧：封面和信息 */}
            <div className="left-panel" style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1.5rem',
                flex: '0 0 300px'
            }}>
                <Cover
                    imageUrl={currentTrack?.cover}
                    isRotating={audio.isPlaying}
                    size={settings.coverSize}
                    onDoubleClick={ui.showSearch}
                    className="compact"
                />

                <TrackInfo
                    title={currentTrack?.title}
                    artist={currentTrack?.artist}
                    album={currentTrack?.subtitle}
                    className="compact"
                />
            </div>

            {/* 右侧：歌词 */}
            <div className="right-panel" style={{ flex: 1 }}>
                <LyricsDisplay
                    currentTime={audio.currentTime}
                    offset={settings.lyricOffset}
                    fontSize={settings.fontSize}
                    showLyrics={settings.showLyrics}
                />
            </div>
        </HorizontalLayout>
    );
};