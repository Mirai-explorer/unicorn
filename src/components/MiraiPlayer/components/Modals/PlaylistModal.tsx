// components/MusicPlayer/components/Modals/PlaylistModal.tsx
/**
 * 播放列表模态框
 */

import React from 'react';
import { usePlayer } from '@/contexts';
import { TimeUtils } from '@/utils';

export const PlaylistModal: React.FC = () => {
    const { ui, playlist, actions } = usePlayer();

    if (!ui.isPlaylistVisible) return null;

    return (

        <div className="playlist_card">
            <div className="playlist_header">
                <h3>播放列表</h3>
                <div className="playlist_count">

                </div>
                <button
                    onClick={ui.hidePlaylist}
                    style={{
                        background: 'none',
                        border: 'none',
                        fontSize: '1rem',
                        cursor: 'pointer',
                    }}
                >
                    ✕
                </button>
            </div>

            <div className="playlist_content">
                {playlist.playlist.length === 0 ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '3rem',
                        color: 'var(--text-secondary)'
                    }}>
                        播放列表为空
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {playlist.playlist.map((track, index) => (
                            <div
                                key={track.id}
                                className={`playlist_item ${index === playlist.currentTrackIndex ? 'current': ''}`}
                                onClick={() => {
                                    playlist.setCurrentTrackIndex(index);
                                    actions.reloadCurrentTrack();
                                }}
                            >
                                <div className={'playlist_item_cover'}>
                                    {/* 封面 */}
                                    <img src={track.cover} alt={track.title} />
                                </div>

                                <div className={'playlist_item_info'}>
                                    {/* 音轨信息 */}
                                    <div className={'playlist_item_title'}>{track.title}</div>
                                    <div className={'playlist_item_artist'}>{track.artist}</div>
                                </div>

                                {/* 时长 */}
                                <div className={'playlist_item_duration'}>
                                    {TimeUtils.formatDuration(track.duration)}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};