// components/MusicPlayer/layouts/index.tsx
/**
 * 布局管理器 - 根据设置选择不同的布局
 */

import React from 'react';
import { useSettings } from '@/contexts';
import { ClassicLayout } from './ClassicLayout';
import { CompactLayout } from './CompactLayout';
import { MinimalLayout } from './MinimalLayout';
import { TheaterLayout } from './TheaterLayout';
import { PCLayout } from './PCLayout';

export const PlayerLayout: React.FC = () => {
    const { settings } = useSettings();
    // 使用可选链和默认值确保display和layout已初始化
    const display = settings.display || {};
    const layout = display.layout || 'pc';

    switch (layout) {
        case 'classic':
            return <ClassicLayout />;
        case 'compact':
            return <CompactLayout />;
        case 'minimal':
            return <MinimalLayout />;
        case 'theater':
            return <TheaterLayout />;
        case 'pc':
            return <PCLayout />;
        default:
            return <PCLayout />;
    }
};