// components/MusicPlayer/layouts/MinimalLayout.tsx
/**
 * 极简布局 - 只显示必要信息
 */

import React from 'react';
import { usePlayer } from '@/contexts';
import { Cover } from '../components/Cover';
import { TrackInfo } from '../components/TrackInfo';
import { VerticalLayout } from '../styles';

export const MinimalLayout: React.FC = () => {
    const { playlist, ui, settings, audio } = usePlayer();
    const { currentTrack } = playlist;

    return (
        <VerticalLayout>
            <Cover
                imageUrl={currentTrack?.cover}
                isRotating={audio.isPlaying}
                size="small"
                onDoubleClick={ui.showSearch}
                className="minimal"
            />

            <TrackInfo
                title={currentTrack?.title}
                artist={currentTrack?.artist}
                album={currentTrack?.subtitle}
                className="minimal"
            />
        </VerticalLayout>
    );
};