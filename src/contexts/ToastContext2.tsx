// contexts/ToastContext2.tsx
/**
 * 通知上下文 - 管理全局 Toast 通知
 */

import React, { createContext, useContext, useState, useCallback } from 'react';
import { ToastMessage, ToastType } from '@/types';

interface ToastContextType {
    toasts: ToastMessage[];
    showToast: (message: string, type?: ToastType, duration?: number) => void;
    showSuccess: (message: string, duration?: number) => void;
    showError: (message: string, duration?: number) => void;
    showWarning: (message: string, duration?: number) => void;
    showInfo: (message: string, duration?: number) => void;
    removeToast: (id: string) => void;
    clearToasts: () => void;
}

const ToastContext2 = createContext<ToastContextType | null>(null);

// 生成唯一 ID
const generateId = (): string => {
    return `toast_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<ToastMessage[]>([]);

    const showToast = useCallback((
        message: string,
        type: ToastType = 'info',
        duration: number = 5000
    ) => {
        const id = generateId();
        const newToast: ToastMessage = {
            id,
            message,
            type,
            duration,
            timestamp: Date.now()
        };

        setToasts(prev => [...prev, newToast]);

        // 自动移除
        if (duration > 0) {
            setTimeout(() => {
                removeToast(id);
            }, duration);
        }
    }, []);

    const showSuccess = useCallback((message: string, duration?: number) => {
        showToast(message, 'success', duration);
    }, [showToast]);

    const showError = useCallback((message: string, duration?: number) => {
        showToast(message, 'error', duration);
    }, [showToast]);

    const showWarning = useCallback((message: string, duration?: number) => {
        showToast(message, 'warning', duration);
    }, [showToast]);

    const showInfo = useCallback((message: string, duration?: number) => {
        showToast(message, 'info', duration);
    }, [showToast]);

    const removeToast = useCallback((id: string) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    }, []);

    const clearToasts = useCallback(() => {
        setToasts([]);
    }, []);

    const value: ToastContextType = {
        toasts,
        showToast,
        showSuccess,
        showError,
        showWarning,
        showInfo,
        removeToast,
        clearToasts
    };

    return (
        <ToastContext2.Provider value={value}>
            {children}
        </ToastContext2.Provider>
    );
};

export const useToast = (): ToastContextType => {
    const context = useContext(ToastContext2);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};