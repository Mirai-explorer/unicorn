// components/MusicPlayer/components/Cover.tsx
/**
 * 封面组件
 */

import React, { memo } from 'react';
import { CoverSize } from '@/types';

interface CoverProps {
    imageUrl?: string;
    isRotating: boolean;
    size: CoverSize;
    onDoubleClick: () => void;
    className?: string;
}

// 使用React.memo减少不必要的重渲染
export const Cover = memo<CoverProps>(({
                                                imageUrl,
                                                isRotating,
                                                size,
                                                onDoubleClick,
                                                className = ''
                                            }) => {
    const sizeMap: Record<CoverSize, string> = {
        small: '120px',
        default: '200px',
        large: '280px',
        xlarge: '360px'
    };

    const coverSize = sizeMap[size];

    return (
        <div
            className={`cover-container ${className}`}
            style={{
                width: coverSize,
                height: coverSize,
                borderRadius: '50%',
                overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                // 确保硬件加速
                transform: 'translateZ(0)',
                // 提示浏览器优化
                willChange: 'transform'
            }}
            onDoubleClick={onDoubleClick}
        >
            <div
                className={`cover-image ${isRotating ? 'rotating' : ''}`}
                style={{
                    width: '100%',
                    height: '100%',
                    backgroundImage: imageUrl ? `url(${imageUrl})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    animation: isRotating ? 'rotate 20s linear infinite' : 'none',
                    animationPlayState: isRotating ? 'running' : 'paused',
                    // 确保硬件加速
                    transform: 'translateZ(0)',
                    // 提示浏览器优化
                    willChange: 'transform'
                }}
            />

            <style>
                {
                    `
          /* 优化后的旋转动画，使用rotateZ明确旋转轴 */
          @keyframes rotate {
            from { transform: rotateZ(0deg); }
            to { transform: rotateZ(360deg); }
          }
          
          .cover-container:hover {
            transform: scale(1.05);
          }
          
          .cover-container.compact {
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
          }
          
          .cover-container.minimal {
            box-shadow: none;
          }
          
          .cover-container.theater {
            box-shadow: 0 16px 64px rgba(0, 0, 0, 0.5);
          }
        `
                }
            </style>
        </div>
    );
});

// 优化memo的比较函数，只在关键属性变化时重渲染
Cover.displayName = 'Cover';