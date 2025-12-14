// components/MiraiPlayer/layouts/PCLayout.tsx
/**
 * PC布局 - 左侧封面，右侧歌曲信息和歌词
 */

import React from 'react';
import { usePlayer } from '@/contexts';
import { Cover } from '../components/Cover';
import { TrackInfo } from '../components/TrackInfo';
import { LyricsDisplay } from '../components/LyricsDisplay';
import { HorizontalLayout } from '../styles';

export const PCLayout: React.FC = () => {
    const { playlist, settings, audio, ui } = usePlayer();
    const { currentTrack } = playlist;

    return (
        <HorizontalLayout style={{ 
            padding: '2rem 0',
            maxWidth: '1200px',
            margin: '0 auto',
            width: '100%'
        }}>
            {/* 左侧：封面 */}
            <div className="left-panel" style={{ 
                flex: '0 0 350px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Cover
                    imageUrl={currentTrack?.cover}
                    isRotating={audio.isPlaying}
                    size={settings.coverSize}
                    onDoubleClick={ui.showSearch}
                    className="pc"
                />
            </div>

            {/* 右侧：歌曲信息和歌词 */}
            <div className="right-panel" style={{ 
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                paddingLeft: '4rem',
                gap: '1.5rem'
            }}>
                {/* 歌曲信息 */}
                <div className="track-info-section" style={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem'
                }}>
                    <h1 style={{ 
                        fontSize: '2.5rem',
                        fontWeight: 'bold',
                        margin: 0,
                        color: 'white'
                    }}>
                        {currentTrack?.title}
                    </h1>
                    <h2 style={{ 
                        fontSize: '1.5rem',
                        fontWeight: 'normal',
                        margin: 0,
                        color: 'white'
                    }}>
                        {currentTrack?.artist}
                    </h2>
                    <p style={{ 
                        fontSize: '1.2rem',
                        margin: 0,
                        color: 'white'
                    }}>
                        {currentTrack?.subtitle}
                    </p>
                </div>

                {/* 歌词显示 */}
                <div className="lyrics-section" style={{ 
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <LyricsDisplay
                        currentTime={audio.currentTime}
                        offset={settings.lyricOffset}
                        fontSize={settings.fontSize}
                        showLyrics={settings.showLyrics}
                        className="pc"
                    />
                </div>
            </div>
        </HorizontalLayout>
    );
};