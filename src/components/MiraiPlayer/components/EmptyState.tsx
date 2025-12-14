// components/MusicPlayer/components/EmptyState.tsx
/**
 * 空状态组件
 */
import React from 'react';

interface EmptyStateProps {
    icon?: string;
    title: string;
    description?: string;
    action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
                                                          icon = '🎵',
                                                          title,
                                                          description,
                                                          action
                                                      }) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            padding: '3rem 2rem',
            textAlign: 'center',
            color: 'var(--text-secondary)'
        }}>
            <div style={{
                fontSize: '4rem',
                marginBottom: '1rem',
                opacity: 0.5
            }}>
                {icon}
            </div>

            <h3 style={{
                margin: '0 0 0.5rem 0',
                color: 'var(--text-primary)',
                fontSize: '1.25rem'
            }}>
                {title}
            </h3>

            {description && (
                <p style={{
                    margin: '0 0 2rem 0',
                    maxWidth: '400px',
                    lineHeight: 1.5
                }}>
                    {description}
                </p>
            )}

            {action}
        </div>
    );
};