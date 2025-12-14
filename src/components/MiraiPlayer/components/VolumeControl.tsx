// components/MusicPlayer/components/VolumeControl.tsx
/**
 * 音量控制组件
 */

import React, { useState, useRef } from 'react';
import { usePlayer } from '@/contexts';

export const VolumeControl: React.FC = () => {
    const { audio, ui } = usePlayer();
    const [isHovering, setIsHovering] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const volumeBarRef = useRef<HTMLDivElement>(null);

    const volumeIcon = audio.volume === 0 ? '🔇' :
        audio.volume < 0.3 ? '🔈' :
            audio.volume < 0.7 ? '🔉' : '🔊';

    const handleVolumeClick = () => {
        if (audio.volume > 0) {
            audio.setVolume(0);
            ui.showInfo('静音');
        } else {
            audio.setVolume(0.8);
            ui.showInfo(`音量: ${Math.round(0.8 * 100)}%`);
        }
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        updateVolume(e);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isDragging) {
            updateVolume(e);
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const updateVolume = (e: React.MouseEvent) => {
        if (!volumeBarRef.current) return;

        const rect = volumeBarRef.current.getBoundingClientRect();
        const y = rect.bottom - e.clientY;
        const percentage = Math.max(0, Math.min(1, y / rect.height));

        audio.setVolume(percentage);
    };

    return (
        <div className="volume-control" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            position: 'relative'
        }}>
            {/* 音量图标 */}
            <button
                onClick={handleVolumeClick}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '1.25rem',
                    cursor: 'pointer',
                    padding: '0.5rem',
                    borderRadius: '4px',
                    color: 'var(--text-primary)',
                    transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                }}
                onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                }}
            >
                {volumeIcon}
            </button>

            {/* 音量条 */}
            {(isHovering || isDragging) && (
                <div
                    ref={volumeBarRef}
                    className="volume-bar-container"
                    style={{
                        position: 'absolute',
                        bottom: '100%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        padding: '1rem 0.5rem',
                        backgroundColor: 'var(--bg-primary)',
                        borderRadius: '8px',
                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
                        backdropFilter: 'blur(20px)',
                        zIndex: 1000
                    }}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                >
                    <div
                        className="volume-bar"
                        style={{
                            width: '4px',
                            height: '80px',
                            backgroundColor: 'var(--bg-secondary)',
                            borderRadius: '2px',
                            position: 'relative',
                            cursor: 'pointer'
                        }}
                    >
                        {/* 音量填充 */}
                        <div
                            className="volume-fill"
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                width: '100%',
                                height: `${audio.volume * 100}%`,
                                backgroundColor: 'var(--accent-color)',
                                borderRadius: '2px',
                                transition: isDragging ? 'none' : 'height 0.2s ease'
                            }}
                        />

                        {/* 音量滑块 */}
                        <div
                            className="volume-thumb"
                            style={{
                                position: 'absolute',
                                bottom: `${audio.volume * 100}%`,
                                left: '50%',
                                transform: 'translate(-50%, 50%)',
                                width: '12px',
                                height: '12px',
                                backgroundColor: 'var(--accent-color)',
                                borderRadius: '50%',
                                cursor: 'grab'
                            }}
                        />
                    </div>

                    {/* 音量百分比 */}
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        right: '-2rem',
                        transform: 'translateY(-50%)',
                        fontSize: '0.8rem',
                        color: 'var(--text-secondary)',
                        whiteSpace: 'nowrap'
                    }}>
                        {Math.round(audio.volume * 100)}%
                    </div>
                </div>
            )}

            <style>
                {`
          .volume-bar-container:hover .volume-thumb,
          .volume-bar-container:active .volume-thumb {
            opacity: 1;
          }
          
          .volume-bar:active .volume-thumb {
            cursor: grabbing;
          }
        `}
            </style>
        </div>
    );
};