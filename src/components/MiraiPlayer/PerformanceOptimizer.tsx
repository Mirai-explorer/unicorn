// components/PerformanceOptimizer.tsx
/**
 * 性能优化组件
 */
import React, { memo, useMemo } from 'react';
import Cover from "@/components/Player/Cover";
import {LyricsDisplay} from "@/components/MiraiPlayer/components/LyricsDisplay";
import {TrackInfo} from "@/components/MiraiPlayer/components/TrackInfo";

// 记忆化组件
export const MemoizedCover = memo(Cover);
export const MemoizedLyricsDisplay = memo(LyricsDisplay);
export const MemoizedTrackInfo = memo(TrackInfo);

// 虚拟滚动组件（用于长播放列表）
interface VirtualizedListProps<T> {
    items: T[];
    itemHeight: number;
    containerHeight: number;
    renderItem: (item: T, index: number) => React.ReactNode;
}

export const VirtualizedList = <T,>({
                                        items,
                                        itemHeight,
                                        containerHeight,
                                        renderItem
                                    }: VirtualizedListProps<T>) => {
    const [scrollTop, setScrollTop] = React.useState(0);

    const visibleRange = useMemo(() => {
        const startIndex = Math.floor(scrollTop / itemHeight);
        const endIndex = Math.min(
            items.length - 1,
            startIndex + Math.ceil(containerHeight / itemHeight)
        );

        return { startIndex, endIndex };
    }, [scrollTop, itemHeight, containerHeight, items.length]);

    const visibleItems = useMemo(() => {
        return items.slice(visibleRange.startIndex, visibleRange.endIndex + 1);
    }, [items, visibleRange.startIndex, visibleRange.endIndex]);

    const paddingTop = visibleRange.startIndex * itemHeight;
    const paddingBottom = (items.length - visibleRange.endIndex - 1) * itemHeight;

    return (
        <div
            style={{ height: containerHeight, overflow: 'auto' }}
            onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
        >
            <div style={{ paddingTop, paddingBottom }}>
                {visibleItems.map((item, index) =>
                    renderItem(item, visibleRange.startIndex + index)
                )}
            </div>
        </div>
    );
};