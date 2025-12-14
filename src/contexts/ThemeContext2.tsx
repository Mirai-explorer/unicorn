// contexts/ThemeContext2.tsx
/**
 * 主题上下文 - 管理应用主题
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeMode } from '@/types';

interface ThemeContextType {
    theme: ThemeMode;
    isDark: boolean;
    setTheme: (theme: ThemeMode) => void;
    toggleTheme: () => void;
}

const ThemeContext2 = createContext<ThemeContextType | null>(null);

// 从系统偏好获取主题
const getSystemTheme = (): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// 从本地存储获取主题
const getStoredTheme = (): ThemeMode | null => {
    if (typeof window === 'undefined') return null;
    try {
        return localStorage.getItem('mirai_player_theme') as ThemeMode;
    } catch {
        return null;
    }
};

// 保存主题到本地存储
const saveTheme = (theme: ThemeMode): void => {
    try {
        localStorage.setItem('mirai_player_theme', theme);
    } catch (error) {
        console.error('保存主题失败:', error);
    }
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setThemeState] = useState<ThemeMode>(() => {
        const stored = getStoredTheme();
        return stored || 'auto';
    });

    const currentTheme = theme === 'auto' ? getSystemTheme() : theme;
    const isDark = currentTheme === 'dark';

    const setTheme = (newTheme: ThemeMode) => {
        setThemeState(newTheme);
        saveTheme(newTheme);
    };

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    // 应用主题到文档
    useEffect(() => {
        const root = document.documentElement;

        if (isDark) {
            root.classList.add('dark-theme');
            root.classList.remove('light-theme');
        } else {
            root.classList.add('light-theme');
            root.classList.remove('dark-theme');
        }

        // 设置主题色
        const primaryColor = isDark ? '#3C8CE7' : '#1976d2';
        root.style.setProperty('--primary-color', primaryColor);
    }, [isDark]);

    // 监听系统主题变化
    useEffect(() => {
        if (theme !== 'auto') return;

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const handleChange = () => {
            // 触发重新渲染
            setThemeState('auto');
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [theme]);

    const value: ThemeContextType = {
        theme,
        isDark,
        setTheme,
        toggleTheme
    };

    return (
        <ThemeContext2.Provider value={value}>
            {children}
            </ThemeContext2.Provider>
    );
};

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext2);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};