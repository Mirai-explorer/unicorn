// components/MusicPlayer/components/TrackInfo.tsx
/**
 * 音轨信息组件
 */

import React from 'react';

interface TrackInfoProps {
    title?: string;
    artist?: string;
    album?: string;
    className?: string;
}

export const TrackInfo: React.FC<TrackInfoProps> = ({
                                                        title = '音乐感动生活',
                                                        artist = 'Mirai 云端播放器',
                                                        album = '未知专辑',
                                                        className = ''
                                                    }) => {
    return (
        <div className={`track-info ${className}`} style={{
            textAlign: 'center',
            maxWidth: '500px',
            userSelect: 'none'
        }}>
            <h2 className="track-title" style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                margin: '0 0 0.5rem 0',
                color: 'white',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
            }}>
                {title}
            </h2>

            <p className="track-artist" style={{
                fontSize: '1.1rem',
                margin: '0 0 0.25rem 0',
                color: 'white',
                opacity: 0.8
            }}>
                {artist}
            </p>

            <p className="track-album" style={{
                fontSize: '0.9rem',
                margin: 0,
                color: 'white',
                opacity: 0.6
            }}>
                {album}
            </p>

            <style>
                {`
          .track-info.compact .track-title {
            font-size: 1.25rem;
          }
          
          .track-info.compact .track-artist {
            font-size: 1rem;
          }
          
          .track-info.compact .track-album {
            font-size: 0.8rem;
          }
          
          .track-info.minimal .track-title {
            font-size: 1rem;
          }
          
          .track-info.minimal .track-artist {
            font-size: 0.9rem;
          }
          
          .track-info.minimal .track-album {
            display: none;
          }
          
          .track-info.theater .track-title {
            font-size: 2rem;
          }
          
          .track-info.theater .track-artist {
            font-size: 1.5rem;
          }
          
          .track-info.theater .track-album {
            font-size: 1.1rem;
          }
        `}
            </style>
        </div>
    );
};