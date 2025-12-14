// components/MusicPlayer/components/LyricsDisplay.tsx
/**
 * 歌词显示组件
 */

import React, { useEffect, useRef, memo } from 'react';
import { usePlayer } from '@/contexts';

interface LyricsDisplayProps {
    currentTime: number;
    offset: number;
    fontSize: number;
    showLyrics: boolean;
    className?: string;
}

export const LyricsDisplay: React.FC<LyricsDisplayProps> = ({
                                                                currentTime,
                                                                offset,
                                                                fontSize,
                                                                showLyrics,
                                                                className = ''
                                                            }) => {
    const { lyrics } = usePlayer();
    const lyricsContainerRef = useRef<HTMLDivElement>(null);
    const lyricsWrapperRef = useRef<HTMLDivElement>(null);
    const currentLineRef = useRef<HTMLDivElement>(null);
    const prevCurrentLineIndexRef = useRef<number>(-1);
    
    // 获取歌词数据，确保在 useEffect 之前定义
    const displayLyrics = lyrics.displayLyrics;

    // 同步歌词
    useEffect(() => {
        lyrics.syncLyrics(currentTime);
    }, [currentTime, lyrics]);

    // 确保 fontSize 变化时重新渲染所有歌词行
    useEffect(() => {
        // 当 fontSize 变化时，无需额外操作
        // React 会自动重新渲染所有歌词行，应用新的 fontSize
    }, [fontSize]);

    // 自动滚动到当前歌词行 - 基于视口位置的精确计算
    useEffect(() => {
        if (currentLineRef.current && lyricsContainerRef.current) {
            // 只有当当前行索引有效（>= 0）时才滚动
            if (lyrics.currentLineIndex >= 0 && prevCurrentLineIndexRef.current !== lyrics.currentLineIndex) {
                const container = lyricsContainerRef.current;
                const currentLine = currentLineRef.current;

                // 获取容器和当前行的视口位置信息
                const containerRect = container.getBoundingClientRect();
                const lineRect = currentLine.getBoundingClientRect();
                
                // 计算当前行中心在视口中的位置
                const lineCenterY = lineRect.top + (lineRect.height / 2);
                
                // 计算歌词容器可见区域的中心位置（而不是整个页面）
                // 容器可见区域中心 = 容器顶部 + 容器高度的一半
                const containerCenterY = containerRect.top + (containerRect.height / 2);
                
                // 计算当前行中心与容器可见区域中心的差异
                const centerDiff = lineCenterY - containerCenterY;
                
                // 计算当前行在容器中的位置
                const lineOffsetTop = currentLine.offsetTop;
                const containerHeight = container.clientHeight;
                const lineHeight = currentLine.offsetHeight;
                
                // 计算理想的滚动位置
                // 滚动距离 = 当前行中心与视口中心的差异
                // 理想滚动位置 = 当前滚动位置 + 中心差异
                const currentScrollTop = container.scrollTop;
                const idealScrollTop = currentScrollTop + centerDiff;
                
                // 获取容器的最大滚动位置
                const maxScrollTop = container.scrollHeight - containerHeight;
                
                // 确保滚动位置在有效范围内
                const finalScrollTop = Math.max(0, Math.min(idealScrollTop, maxScrollTop));
                
                // 计算滚动差异
                const scrollDiff = Math.abs(finalScrollTop - currentScrollTop);
                
                // 基于实际行样式调整阈值：行高27px + padding8px*2 + margin8px*2 = 总高度59px
                // 差异阈值设为行高的一半(29.5px)，确保更好的居中效果
                // 滚动变化阈值设为5px，在保证性能的同时提高灵敏度
                if (Math.abs(centerDiff) > 29.5 && scrollDiff > 5) {
                    container.scrollTo({
                        top: finalScrollTop,
                        behavior: 'smooth'
                    });
                }

                prevCurrentLineIndexRef.current = lyrics.currentLineIndex;
            }
        }
    }, [lyrics.currentLineIndex]);

    if (!showLyrics || !lyrics.hasLyrics) {
        return (
            <div className={`lyrics-container ${className}`} style={{
                height: '200px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-secondary)',
                opacity: 0.6
            }}>
                {lyrics.hasLyrics ? '歌词已隐藏' : '暂无歌词'}
            </div>
        );
    }

    return (
        <div
            ref={lyricsContainerRef}
            className={`lyrics-container ${className}`}
            style={{
                height: '300px',
                overflow: 'hidden auto',
                textAlign: 'center',
                scrollBehavior: 'smooth',
                // 添加内边距，替代内部 wrapper 的 padding
                padding: '2rem 0',
                // 优化滚动性能
                willChange: 'scrollTop'
            }}
        >
            {displayLyrics.map((line, index) => {
                    const isCurrent = index === lyrics.currentLineIndex;
                    const isPrevious = index === lyrics.previousLineIndex;
                    const isNext = index === lyrics.nextLineIndex;

                    let opacity = 0.3;
                    let scale = 0.9;

                    if (isCurrent) {
                        opacity = 1;
                        scale = 1.1;
                    } else if (isPrevious || isNext) {
                        opacity = 0.7;
                        scale = 1;
                    }

                    return (
                        <div
                            key={index}
                            ref={isCurrent ? currentLineRef : null}
                            className={`lyric-line ${isCurrent ? 'current' : ''}`}
                            style={{
                                fontSize: `${fontSize}px`,
                                lineHeight: 1.5,
                                margin: '0.5rem 0',
                                padding: '0.25rem 1rem',
                                color: 'white', // 将默认颜色设置为白色
                                opacity,
                                transform: `scale(${scale})`,
                                transition: 'all 0.3s ease',
                                fontWeight: isCurrent ? '600' : '400',
                                // 优化变换性能
                                willChange: 'opacity, transform'
                            }}
                        >
                            {line.text}
                        </div>
                    );
                })}

            <style>
                {
                    `
          .lyrics-container::-webkit-scrollbar {
            width: 4px;
          }
          
          .lyrics-container::-webkit-scrollbar-track {
            background: transparent;
          }
          
          .lyrics-container::-webkit-scrollbar-thumb {
            background: var(--text-secondary);
            border-radius: 2px;
            opacity: 0.3;
          }
          
          .lyrics-container.compact {
            height: 250px;
          }
          
          .lyrics-container.theater {
            height: 400px;
          }
          
          .lyric-line.current {
            color: var(--accent-color) !important;
          }
        `
                }
            </style>
        </div>
    );
};

// 设置displayName
LyricsDisplay.displayName = 'LyricsDisplay';