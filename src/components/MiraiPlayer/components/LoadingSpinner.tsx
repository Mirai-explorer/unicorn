// components/MusicPlayer/components/LoadingSpinner.tsx
/**
 * 加载状态组件
 */
import React from 'react';

interface LoadingSpinnerProps {
    size?: 'small' | 'medium' | 'large';
    text?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
                                                                  size = 'medium',
                                                                  text = '加载中...'
                                                              }) => {
    const sizeMap = {
        small: '24px',
        medium: '32px',
        large: '48px'
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            padding: '2rem'
        }}>
            <div
                style={{
                    width: sizeMap[size],
                    height: sizeMap[size],
                    border: `3px solid var(--bg-secondary)`,
                    borderTop: `3px solid var(--accent-color)`,
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                }}
            />
            {text && (
                <span style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.9rem'
                }}>
          {text}
        </span>
            )}

            <style>
                {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
            </style>
        </div>
    );
};