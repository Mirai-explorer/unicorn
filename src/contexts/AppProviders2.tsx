// contexts/AppProviders2.tsx
/**
 * 应用 Provider 组合 - 一次性提供所有 Context
 */

import React from 'react';
import { PlayerProvider } from './PlayerContext2';
import { ThemeProvider } from './ThemeContext2';
import { ToastProvider } from './ToastContext2';
import { SettingsProvider } from './SettingsContext';

interface AppProvidersProps {
    children: React.ReactNode;
}

export const AppProviders2: React.FC<AppProvidersProps> = ({ children }) => {
    return (
        <ThemeProvider>
            <ToastProvider>
                <SettingsProvider>
                    <PlayerProvider>
                        {children}
                    </PlayerProvider>
                </SettingsProvider>
            </ToastProvider>
        </ThemeProvider>
    );
};