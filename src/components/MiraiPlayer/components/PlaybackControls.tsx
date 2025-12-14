// components/MusicPlayer/components/PlaybackControls.tsx
/**
 * 播放控制组件
 */

import React, { memo } from 'react';
import { usePlayer } from '@/contexts';
import { PlaybackMode } from '@/types';

// 使用React.memo减少不必要的重渲染
const ControlButton = memo<{
    onClick: () => void;
    icon: string;
    title: string;
    disabled?: boolean;
    active?: boolean;
    size?: 'small' | 'medium' | 'large';
}>(({ onClick, icon, title, disabled = false, active = false, size = 'medium' }) => {
    const sizeMap = {
        small: '2rem',
        medium: '3rem',
        large: '4rem'
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            title={title}
            style={{
                width: sizeMap[size],
                height: sizeMap[size],
                borderRadius: '50%',
                border: 'none',
                backgroundColor: active ? 'var(--accent-color)' : 'transparent',
                color: active ? 'white' : 'var(--text-primary)',
                fontSize: size === 'large' ? '1.5rem' : '1.25rem',
                cursor: disabled ? 'not-allowed' : 'pointer',
                opacity: disabled ? 0.5 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
                backdropFilter: 'blur(10px)',
                // 优化变换性能
                willChange: 'transform, backgroundColor'
            }}
            onMouseEnter={(e) => {
                if (!disabled) {
                    e.currentTarget.style.transform = 'scale(1.1)';
                    e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                }
            }}
            onMouseLeave={(e) => {
                if (!disabled) {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.backgroundColor = active ? 'var(--accent-color)' : 'transparent';
                }
            }}
        >
            {icon}
        </button>
    );
});

// 使用React.memo减少不必要的重渲染
export const PlaybackControls = memo(() => {
    const { audio, playlist, ui, actions } = usePlayer();

    // 播放模式图标映射（使用const定义，避免每次渲染重新创建）
    const playbackModeIcons: Record<PlaybackMode, string> = {
        sequential: '🔁',
        'repeat-one': '🔂',
        'repeat-all': '🔂',
        shuffle: '🔀'
    };

    // 播放模式标签映射（使用const定义，避免每次渲染重新创建）
    const playbackModeLabels: Record<PlaybackMode, string> = {
        sequential: '列表循环',
        'repeat-one': '单曲循环',
        'repeat-all': '列表循环',
        shuffle: '随机播放'
    };

    const handlePlaybackModeClick = () => {
        const modes: PlaybackMode[] = ['sequential', 'repeat-one', 'repeat-all', 'shuffle'];
        const currentIndex = modes.indexOf(playlist.playbackMode);
        const nextIndex = (currentIndex + 1) % modes.length;
        playlist.setPlaybackMode(modes[nextIndex]);

        ui.showInfo(`播放模式: ${playbackModeLabels[modes[nextIndex]]}`);
    };

    return (
        <div className="playback-controls" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            padding: '0 1rem'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {/* 播放模式 */}
                <ControlButton
                    onClick={handlePlaybackModeClick}
                    icon={playbackModeIcons[playlist.playbackMode]}
                    title={playbackModeLabels[playlist.playbackMode]}
                    size="small"
                />

                {/* 上一首 */}
                <ControlButton
                    onClick={playlist.previousTrack}
                    icon="⏮️"
                    title="上一首"
                    disabled={!playlist.canPlayPrevious}
                />

                {/* 播放/暂停 */}
                <ControlButton
                    onClick={actions.togglePlayback}
                    icon={audio.isPlaying ? '⏸️' : '▶️'}
                    title={audio.isPlaying ? '暂停' : '播放'}
                    size="large"
                    disabled={!playlist.hasTracks}
                />

                {/* 下一首 */}
                <ControlButton
                    onClick={playlist.nextTrack}
                    icon="⏭️"
                    title="下一首"
                    disabled={!playlist.canPlayNext}
                />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {/* 播放列表 */}
                <ControlButton
                    onClick={ui.showPlaylist}
                    icon="📋"
                    title="播放列表"
                    size="small"
                />

                {/* 设置 */}
                <ControlButton
                    onClick={ui.showSettings}
                    icon="⚙️"
                    title="设置"
                    size="small"
                />
            </div>

            <style>
                {
                    `
          @media (max-width: 768px) {
            .playback-controls {
              flex-direction: column;
              gap: 1rem;
            }
            
            .playback-controls > div {
              gap: 0.5rem;
            }
          }
        `
                }
            </style>
        </div>
    );
});

// 设置displayName
PlaybackControls.displayName = 'PlaybackControls';
ControlButton.displayName = 'ControlButton';