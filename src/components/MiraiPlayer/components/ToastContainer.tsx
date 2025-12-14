// components/MusicPlayer/components/ToastContainer.tsx
/**
 * Toast 通知容器
 */

import React, { useEffect } from 'react';
import { useToast } from '@/contexts';

export const ToastContainer: React.FC = () => {
    const { toasts, removeToast } = useToast();

    useEffect(() => {
        // 自动移除过期的 Toast
        const now = Date.now();
        toasts.forEach(toast => {
            if (toast.duration && now - toast.timestamp > toast.duration) {
                removeToast(toast.id);
            }
        });
    }, [toasts, removeToast]);

    if (toasts.length === 0) return null;

    const toastTypeStyles = {
        info: { backgroundColor: '#2196F3', color: 'white' },
        success: { backgroundColor: '#4CAF50', color: 'white' },
        warning: { backgroundColor: '#FF9800', color: 'white' },
        error: { backgroundColor: '#F44336', color: 'white' }
    };

    return (
        <div style={{
            position: 'fixed',
            top: '1rem',
            right: '1rem',
            zIndex: 2000,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            maxWidth: '400px'
        }}>
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    style={{
                        padding: '1rem 1.5rem',
                        borderRadius: '8px',
                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
                        backdropFilter: 'blur(10px)',
                        animation: 'slideIn 0.3s ease',
                        ...toastTypeStyles[toast.type || 'info']
                    }}
                >
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '1rem'
                    }}>
                        <span style={{ flex: 1 }}>{toast.message}</span>
                        <button
                            onClick={() => removeToast(toast.id)}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: 'inherit',
                                cursor: 'pointer',
                                fontSize: '1.2rem',
                                padding: '0.25rem',
                                borderRadius: '4px',
                                opacity: 0.7
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.opacity = '1';
                                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.opacity = '0.7';
                                e.currentTarget.style.backgroundColor = 'transparent';
                            }}
                        >
                            ✕
                        </button>
                    </div>
                </div>
            ))}

            <style>
                {`
          @keyframes slideIn {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
        `}
            </style>
        </div>
    );
};