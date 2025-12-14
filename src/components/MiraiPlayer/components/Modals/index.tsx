// components/MusicPlayer/components/Modals/index.tsx
/**
 * 模态框组件集合
 */

import React from 'react';
import { SearchModal } from './SearchModal';
import { PlaylistModal } from './PlaylistModal';
import { SettingsModal } from './SettingsModal';

export const Modals: React.FC = () => {
    return (
        <>
            <SearchModal />
            <PlaylistModal />
            <SettingsModal />
        </>
    );
};