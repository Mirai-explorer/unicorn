// contexts/SettingsContext.tsx
/**
 * 设置上下文 - 管理全局设置
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { PlayerSettings, SettingsPreset } from '@/types';
import { StorageHelper } from '@/utils';

interface SettingsContextType {
    settings: PlayerSettings;
    updateSettings: (updates: Partial<PlayerSettings>) => void;
    resetSettings: () => void;
    applyPreset: (preset: SettingsPreset) => void;
    exportSettings: () => void;
    importSettings: (file: File) => Promise<boolean>;
    hasUnsavedChanges: boolean;
}

const SettingsContext = createContext<SettingsContextType | null>(null);

// 默认设置
const defaultSettings: PlayerSettings = {
    audio: {
        volume: 0.8,
        playbackRate: 1,
        quality: 'high' as const,
        crossfadeDuration: 0,
        gaplessPlayback: true,
        normalizeVolume: false,
        bassBoost: 0,
        equalizerPreset: 'flat',
        spatialAudio: false
    },
    lyrics: {
        fontSize: 24,
        lyricOffset: 0,
        lyricLanguage: 'original',
        showLyrics: true,
        highlightColor: '#ffd700',
        backgroundColor: 'transparent',
        showTranslation: true,
        showRomaji: false,
        syncMode: 'auto'
    },
    playback: {
        autoPlay: true,
        autoNext: true,
        shuffle: false,
        repeatMode: 'sequential',
        fadeInOut: true,
        preventSleep: false,
        hardwareAcceleration: true,
        cacheSize: 100
    },
    display: {
        language: 'zh-CN',
        theme: 'auto',
        layout: 'classic',
        coverSize: 'default',
        animationMode: 'full',
        showSpectrum: false,
        showWaveform: false,
        highContrast: false,
        reduceMotion: false,
        controlPosition: 'bottom'
    },
    shortcuts: {
        playPause: ' ',
        nextTrack: 'ArrowRight',
        previousTrack: 'ArrowLeft',
        volumeUp: 'ArrowUp',
        volumeDown: 'ArrowDown',
        toggleMute: 'm',
        toggleLyrics: 'Ctrl+l',
        togglePlaylist: 'Ctrl+p',
        toggleFullscreen: 'f',
        seekForward: 'f',
        seekBackward: 'b',
        toggleShuffle: 's',
        toggleRepeat: 'r'
    },
    storage: {
        autoSave: true,
        backupInterval: 24,
        maxHistoryItems: 1000,
        cacheEnabled: true,
        cacheLocation: 'local'
    },
    version: '1.0.0',
    lastModified: Date.now(),
    created: 1728000000000
};

// 设置预设
export const settingsPresets: SettingsPreset[] = [
    {
        id: 'default',
        name: '默认设置',
        description: '恢复所有设置为默认值',
        settings: defaultSettings,
        category: 'all'
    },
    {
        id: 'audio_focus',
        name: '音频专注模式',
        description: '优化音频质量和性能',
        settings: {
            audio: {
                quality: 'lossless',
                gaplessPlayback: true,
                normalizeVolume: true
            },
            playback: {
                fadeInOut: true,
                preventSleep: true
            }
        },
        category: 'audio'
    },
    {
        id: 'minimal_ui',
        name: '极简界面',
        description: '简化界面元素，专注音乐',
        settings: {
            display: {
                layout: 'minimal',
                showSpectrum: false,
                showWaveform: false,
                animationMode: 'reduced'
            },
            lyrics: {
                showLyrics: false
            }
        },
        category: 'display'
    },
    {
        id: 'karaoke_mode',
        name: '卡拉OK模式',
        description: '优化歌词显示和同步',
        settings: {
            lyrics: {
                fontSize: 24,
                highlightColor: '#ff0000',
                showTranslation: true,
                syncMode: 'manual'
            },
            display: {
                layout: 'theater'
            }
        },
        category: 'lyrics'
    }
];

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [settings, setSettings] = useState<PlayerSettings>(defaultSettings);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    // 加载设置
    useEffect(() => {
        const loadSettings = async () => {
            try {
                const saved = await StorageHelper.get<PlayerSettings>('player_settings');
                if (saved) {
                    setSettings(saved);
                }
            } catch (error) {
                console.error('加载设置失败:', error);
            }
        };

        loadSettings();
    }, []);

    // 保存设置
    const saveSettings = useCallback(async (newSettings: PlayerSettings) => {
        try {
            await StorageHelper.set('player_settings', {
                ...newSettings,
                lastModified: Date.now()
            });
            setHasUnsavedChanges(false);
        } catch (error) {
            console.error('保存设置失败:', error);
        }
    }, []);

    // 自动保存设置
    useEffect(() => {
        if (hasUnsavedChanges) {
            const timeoutId = setTimeout(() => {
                saveSettings(settings);
            }, 1000);

            return () => clearTimeout(timeoutId);
        }
    }, [settings, hasUnsavedChanges, saveSettings]);

    const updateSettings = useCallback((updates: Partial<PlayerSettings>) => {
        setSettings(prev => ({
            ...prev,
            ...updates
        }));
        setHasUnsavedChanges(true);
    }, []);

    const resetSettings = useCallback(() => {
        setSettings(defaultSettings);
        setHasUnsavedChanges(true);
    }, []);

    const applyPreset = useCallback((preset: SettingsPreset) => {
        setSettings(prev => ({
            ...prev,
            ...preset.settings
        }));
        setHasUnsavedChanges(true);
    }, []);

    const exportSettings = useCallback(() => {
        const dataStr = JSON.stringify(settings, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });

        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `mirai-player-settings-${new Date().getTime()}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }, [settings]);

    const importSettings = useCallback(async (file: File): Promise<boolean> => {
        try {
            const text = await file.text();
            const imported = JSON.parse(text) as PlayerSettings;

            // 验证导入的设置
            if (imported && typeof imported === 'object') {
                setSettings(imported);
                setHasUnsavedChanges(true);
                return true;
            }
            return false;
        } catch (error) {
            console.error('导入设置失败:', error);
            return false;
        }
    }, []);

    const value: SettingsContextType = {
        settings,
        updateSettings,
        resetSettings,
        applyPreset,
        exportSettings,
        importSettings,
        hasUnsavedChanges
    };

    return (
        <SettingsContext.Provider value={value}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = (): SettingsContextType => {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
};