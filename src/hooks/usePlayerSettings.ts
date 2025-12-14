// hooks/usePlayerSettings.ts
import { useState, useCallback, useEffect } from 'react';
import {
    PlayerLayout,
    CoverSize,
    LyricLanguage,
    ThemeMode,
    QualityLevel
} from '@/types';
import { StorageHelper } from '@/utils';

// 定义设置类型
interface PlayerSettings {
    layout: PlayerLayout;
    coverSize: CoverSize;
    lyricLanguage: LyricLanguage;
    theme: ThemeMode;
    quality: QualityLevel;
    fontSize: number;
    lyricOffset: number;
    volume: number;
    playbackRate: number;
    crossfadeDuration: number;
    gaplessPlayback: boolean;
    autoPlay: boolean;
    showLyrics: boolean;
    showSpectrum: boolean;
    reduceAnimations: boolean;
    highContrast: boolean;
}

// 默认设置（带类型）
const DEFAULT_SETTINGS: PlayerSettings = {
    layout: 'classic',
    coverSize: 'default',
    lyricLanguage: 'original',
    theme: 'auto',
    quality: 'high',
    fontSize: 18,
    lyricOffset: 0,
    volume: 0.8,
    playbackRate: 1,
    crossfadeDuration: 0,
    gaplessPlayback: true,
    autoPlay: true,
    showLyrics: true,
    showSpectrum: false,
    reduceAnimations: false,
    highContrast: false
};

export const usePlayerSettings = () => {
    // 🎯 布局和外观设置
    const [activeLayout, setActiveLayout] = useState<PlayerLayout>(DEFAULT_SETTINGS.layout);
    const [coverSize, setCoverSizeState] = useState<CoverSize>(DEFAULT_SETTINGS.coverSize); // 重命名
    const [theme, setThemeState] = useState<ThemeMode>(DEFAULT_SETTINGS.theme); // 重命名

    // 🎯 歌词设置
    const [fontSize, setFontSizeState] = useState(DEFAULT_SETTINGS.fontSize);
    const [lyricOffset, setLyricOffsetState] = useState(DEFAULT_SETTINGS.lyricOffset);
    const [lyricLanguage, setLyricLanguageState] = useState<LyricLanguage>(DEFAULT_SETTINGS.lyricLanguage); // 重命名
    const [showLyrics, setShowLyricsState] = useState(DEFAULT_SETTINGS.showLyrics); // 重命名

    // 🎯 音频设置
    const [volume, setVolumeState] = useState(DEFAULT_SETTINGS.volume);
    const [playbackRate, setPlaybackRateState] = useState(DEFAULT_SETTINGS.playbackRate);
    const [quality, setQualityState] = useState<QualityLevel>(DEFAULT_SETTINGS.quality); // 重命名
    const [crossfadeDuration, setCrossfadeDurationState] = useState(DEFAULT_SETTINGS.crossfadeDuration); // 重命名
    const [gaplessPlayback, setGaplessPlaybackState] = useState(DEFAULT_SETTINGS.gaplessPlayback); // 重命名

    // 🎯 功能设置
    const [autoPlay, setAutoPlayState] = useState(DEFAULT_SETTINGS.autoPlay); // 重命名
    const [showSpectrum, setShowSpectrumState] = useState(DEFAULT_SETTINGS.showSpectrum); // 重命名
    const [reduceAnimations, setReduceAnimationsState] = useState(DEFAULT_SETTINGS.reduceAnimations); // 重命名
    const [highContrast, setHighContrastState] = useState(DEFAULT_SETTINGS.highContrast); // 重命名

    // 🎯 系统状态
    const [isLoaded, setIsLoaded] = useState(false);

    // 🎯 加载设置
    const loadSettings = useCallback(async () => {
        try {
            const savedSettings: PlayerSettings | null = await StorageHelper.get('player_settings');

            if (savedSettings) {
                // 应用保存的设置，使用默认值作为回退
                setActiveLayout(savedSettings.layout || DEFAULT_SETTINGS.layout);
                setCoverSizeState(savedSettings.coverSize || DEFAULT_SETTINGS.coverSize);
                setThemeState(savedSettings.theme || DEFAULT_SETTINGS.theme);
                setFontSizeState(savedSettings.fontSize || DEFAULT_SETTINGS.fontSize);
                setLyricOffsetState(savedSettings.lyricOffset || DEFAULT_SETTINGS.lyricOffset);
                setLyricLanguageState(savedSettings.lyricLanguage || DEFAULT_SETTINGS.lyricLanguage);
                setShowLyricsState(savedSettings.showLyrics ?? DEFAULT_SETTINGS.showLyrics);
                setVolumeState(savedSettings.volume || DEFAULT_SETTINGS.volume);
                setPlaybackRateState(savedSettings.playbackRate || DEFAULT_SETTINGS.playbackRate);
                setQualityState(savedSettings.quality || DEFAULT_SETTINGS.quality);
                setCrossfadeDurationState(savedSettings.crossfadeDuration || DEFAULT_SETTINGS.crossfadeDuration);
                setGaplessPlaybackState(savedSettings.gaplessPlayback ?? DEFAULT_SETTINGS.gaplessPlayback);
                setAutoPlayState(savedSettings.autoPlay ?? DEFAULT_SETTINGS.autoPlay);
                setShowSpectrumState(savedSettings.showSpectrum ?? DEFAULT_SETTINGS.showSpectrum);
                setReduceAnimationsState(savedSettings.reduceAnimations ?? DEFAULT_SETTINGS.reduceAnimations);
                setHighContrastState(savedSettings.highContrast ?? DEFAULT_SETTINGS.highContrast);
            }

            setIsLoaded(true);
        } catch (error) {
            console.error('加载设置失败:', error);
            setIsLoaded(true); // 即使失败也标记为已加载，使用默认值
        }
    }, []);

    // 🎯 保存设置
    const saveSettings = useCallback(async () => {
        try {
            const settingsToSave = {
                layout: activeLayout,
                coverSize,
                theme,
                fontSize,
                lyricOffset,
                lyricLanguage,
                showLyrics,
                volume,
                playbackRate,
                quality,
                crossfadeDuration,
                gaplessPlayback,
                autoPlay,
                showSpectrum,
                reduceAnimations,
                highContrast
            };

            await StorageHelper.set('player_settings', settingsToSave);
        } catch (error) {
            console.error('保存设置失败:', error);
        }
    }, [
        activeLayout, coverSize, theme, fontSize, lyricOffset, lyricLanguage,
        showLyrics, volume, playbackRate, quality, crossfadeDuration, gaplessPlayback,
        autoPlay, showSpectrum, reduceAnimations, highContrast
    ]);

    // 🎯 重置为默认设置
    const resetToDefaults = useCallback(() => {
        setActiveLayout(DEFAULT_SETTINGS.layout);
        setCoverSizeState(DEFAULT_SETTINGS.coverSize);
        setThemeState(DEFAULT_SETTINGS.theme);
        setFontSizeState(DEFAULT_SETTINGS.fontSize);
        setLyricOffsetState(DEFAULT_SETTINGS.lyricOffset);
        setLyricLanguageState(DEFAULT_SETTINGS.lyricLanguage);
        setShowLyricsState(DEFAULT_SETTINGS.showLyrics);
        setVolumeState(DEFAULT_SETTINGS.volume);
        setPlaybackRateState(DEFAULT_SETTINGS.playbackRate);
        setQualityState(DEFAULT_SETTINGS.quality);
        setCrossfadeDurationState(DEFAULT_SETTINGS.crossfadeDuration);
        setGaplessPlaybackState(DEFAULT_SETTINGS.gaplessPlayback);
        setAutoPlayState(DEFAULT_SETTINGS.autoPlay);
        setShowSpectrumState(DEFAULT_SETTINGS.showSpectrum);
        setReduceAnimationsState(DEFAULT_SETTINGS.reduceAnimations);
        setHighContrastState(DEFAULT_SETTINGS.highContrast);
    }, []);

    // 🎯 布局设置控制
    const setLayout = useCallback((layout: PlayerLayout) => {
        setActiveLayout(layout);
    }, []);

    const setCoverSize = useCallback((size: CoverSize) => {
        setCoverSizeState(size);
    }, []);

    const setTheme = useCallback((newTheme: ThemeMode) => {
        setThemeState(newTheme);

        // 应用主题到文档
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark-theme');
            document.documentElement.classList.remove('light-theme');
        } else if (newTheme === 'light') {
            document.documentElement.classList.add('light-theme');
            document.documentElement.classList.remove('dark-theme');
        } else {
            // auto - 跟随系统
            document.documentElement.classList.remove('dark-theme', 'light-theme');
        }
    }, []);

    // 🎯 歌词设置控制（带边界检查）
    const setFontSize = useCallback((size: number) => {
        const clampedSize = Math.max(12, Math.min(32, size));
        setFontSizeState(clampedSize);
    }, []);

    const setLyricOffset = useCallback((offset: number) => {
        // 限制在 -5000ms 到 +5000ms 之间
        const clampedOffset = Math.max(-5000, Math.min(5000, offset));
        setLyricOffsetState(clampedOffset);
    }, []);

    const setLyricLanguage = useCallback((language: LyricLanguage) => {
        setLyricLanguageState(language);
    }, []);

    const setShowLyrics = useCallback((show: boolean) => {
        setShowLyricsState(show);
    }, []);

    // 🎯 音频设置控制
    const setVolume = useCallback((newVolume: number) => {
        const clampedVolume = Math.max(0, Math.min(1, newVolume));
        setVolumeState(clampedVolume);
    }, []);

    const setPlaybackRate = useCallback((rate: number) => {
        const validRates = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
        const closestRate = validRates.reduce((prev, curr) =>
            Math.abs(curr - rate) < Math.abs(prev - rate) ? curr : prev
        );
        setPlaybackRateState(closestRate);
    }, []);

    const setQuality = useCallback((newQuality: QualityLevel) => {
        setQualityState(newQuality);
    }, []);

    const setCrossfadeDuration = useCallback((duration: number) => {
        // 限制在 0-10 秒之间
        const clampedDuration = Math.max(0, Math.min(10, duration));
        setCrossfadeDurationState(clampedDuration);
    }, []);

    const setGaplessPlayback = useCallback((enabled: boolean) => {
        setGaplessPlaybackState(enabled);
    }, []);

    // 🎯 功能设置控制
    const setAutoPlay = useCallback((enabled: boolean) => {
        setAutoPlayState(enabled);
    }, []);

    const setShowSpectrum = useCallback((show: boolean) => {
        setShowSpectrumState(show);
    }, []);

    const setReduceAnimations = useCallback((reduce: boolean) => {
        setReduceAnimationsState(reduce);

        // 应用到文档，供CSS使用
        if (reduce) {
            document.documentElement.classList.add('reduce-motion');
        } else {
            document.documentElement.classList.remove('reduce-motion');
        }
    }, []);

    const setHighContrast = useCallback((enabled: boolean) => {
        setHighContrastState(enabled);

        // 应用到文档，供CSS使用
        if (enabled) {
            document.documentElement.classList.add('high-contrast');
        } else {
            document.documentElement.classList.remove('high-contrast');
        }
    }, []);

    // 🎯 设置预设
    const applyPreset = useCallback((presetName: 'default' | 'minimal' | 'theater' | 'audioFocus') => {
        const presets = {
            default: { ...DEFAULT_SETTINGS },
            minimal: {
                ...DEFAULT_SETTINGS,
                layout: 'minimal',
                showLyrics: false,
                showSpectrum: false,
                reduceAnimations: true
            },
            theater: {
                ...DEFAULT_SETTINGS,
                layout: 'classic',
                coverSize: 'large',
                showLyrics: true,
                showSpectrum: true
            },
            audioFocus: {
                ...DEFAULT_SETTINGS,
                layout: 'minimal',
                showLyrics: false,
                showSpectrum: false,
                reduceAnimations: true,
                crossfadeDuration: 3
            }
        };

        const preset = presets[presetName];

        setActiveLayout(preset.layout as PlayerLayout);
        setCoverSizeState(preset.coverSize as CoverSize);
        setFontSizeState(preset.fontSize);
        setShowLyricsState(preset.showLyrics);
        setShowSpectrumState(preset.showSpectrum);
        setReduceAnimationsState(preset.reduceAnimations);
        setCrossfadeDurationState(preset.crossfadeDuration);
    }, []);

    // 🎯 导出设置
    const exportSettings = useCallback(() => {
        const settings = {
            layout: activeLayout,
            coverSize,
            theme,
            fontSize,
            lyricOffset,
            lyricLanguage,
            showLyrics,
            volume,
            playbackRate,
            quality,
            crossfadeDuration,
            gaplessPlayback,
            autoPlay,
            showSpectrum,
            reduceAnimations,
            highContrast,
            exportedAt: new Date().toISOString()
        };

        const blob = new Blob([JSON.stringify(settings, null, 2)], {
            type: 'application/json'
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `player-settings-${new Date().getTime()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }, [
        activeLayout, coverSize, theme, fontSize, lyricOffset, lyricLanguage,
        showLyrics, volume, playbackRate, quality, crossfadeDuration, gaplessPlayback,
        autoPlay, showSpectrum, reduceAnimations, highContrast
    ]);

    // 🎯 导入设置
    const importSettings = useCallback(async (file: File) => {
        try {
            const text = await file.text();
            const importedSettings = JSON.parse(text);

            // 验证并应用设置
            if (importedSettings.layout) setActiveLayout(importedSettings.layout);
            if (importedSettings.coverSize) setCoverSizeState(importedSettings.coverSize);
            if (importedSettings.theme) setTheme(importedSettings.theme);
            if (importedSettings.fontSize) setFontSize(importedSettings.fontSize);
            if (importedSettings.lyricOffset) setLyricOffset(importedSettings.lyricOffset);
            if (importedSettings.lyricLanguage) setLyricLanguage(importedSettings.lyricLanguage);
            if (importedSettings.showLyrics !== undefined) setShowLyrics(importedSettings.showLyrics);
            if (importedSettings.volume) setVolume(importedSettings.volume);
            if (importedSettings.playbackRate) setPlaybackRate(importedSettings.playbackRate);
            if (importedSettings.quality) setQuality(importedSettings.quality);
            if (importedSettings.crossfadeDuration) setCrossfadeDuration(importedSettings.crossfadeDuration);
            if (importedSettings.gaplessPlayback !== undefined) setGaplessPlayback(importedSettings.gaplessPlayback);
            if (importedSettings.autoPlay !== undefined) setAutoPlay(importedSettings.autoPlay);
            if (importedSettings.showSpectrum !== undefined) setShowSpectrum(importedSettings.showSpectrum);
            if (importedSettings.reduceAnimations !== undefined) setReduceAnimations(importedSettings.reduceAnimations);
            if (importedSettings.highContrast !== undefined) setHighContrast(importedSettings.highContrast);

            return true;
        } catch (error) {
            console.error('导入设置失败:', error);
            return false;
        }
    }, [
        setActiveLayout, setCoverSize, setTheme, setFontSize, setLyricOffset,
        setLyricLanguage, setShowLyrics, setVolume, setPlaybackRate, setQuality,
        setCrossfadeDuration, setGaplessPlayback, setAutoPlay, setShowSpectrum,
        setReduceAnimations, setHighContrast
    ]);

    // 🎯 初始化加载设置
    useEffect(() => {
        loadSettings();
    }, [loadSettings]);

    // 🎯 设置变化时自动保存
    useEffect(() => {
        if (isLoaded) {
            saveSettings();
        }
    }, [
        isLoaded, saveSettings, activeLayout, coverSize, theme, fontSize,
        lyricOffset, lyricLanguage, showLyrics, volume, playbackRate, quality,
        crossfadeDuration, gaplessPlayback, autoPlay, showSpectrum, reduceAnimations, highContrast
    ]);

    // 🎯 计算属性
    const settingsSummary = useCallback(() => {
        return {
            layout: activeLayout,
            theme: theme === 'auto' ? '跟随系统' : theme === 'dark' ? '深色' : '浅色',
            lyrics: showLyrics ? '显示' : '隐藏',
            quality: quality === 'high' ? '高质量' : quality === 'medium' ? '标准' : '节省流量',
            animations: reduceAnimations ? '简化' : '完整'
        };
    }, [activeLayout, theme, showLyrics, quality, reduceAnimations]);

    return {
        // === 状态 ===
        // 布局和外观
        activeLayout,
        coverSize,
        theme,

        // 歌词设置
        fontSize,
        lyricOffset,
        lyricLanguage,
        showLyrics,

        // 音频设置
        volume,
        playbackRate,
        quality,
        crossfadeDuration,
        gaplessPlayback,

        // 功能设置
        autoPlay,
        showSpectrum,
        reduceAnimations,
        highContrast,

        // 系统状态
        isLoaded,

        // === 控制方法 ===
        // 布局和外观
        setLayout,
        setCoverSize,
        setTheme,

        // 歌词设置
        setFontSize,
        setLyricOffset,
        setLyricLanguage,
        setShowLyrics,

        // 音频设置
        setVolume,
        setPlaybackRate,
        setQuality,
        setCrossfadeDuration,
        setGaplessPlayback,

        // 功能设置
        setAutoPlay,
        setShowSpectrum,
        setReduceAnimations,
        setHighContrast,

        // === 设置管理 ===
        resetToDefaults,
        applyPreset,
        exportSettings,
        importSettings,
        loadSettings,
        saveSettings,

        // === 工具方法 ===
        settingsSummary,

        // === 状态检查 ===
        get hasCustomSettings() {
            return JSON.stringify({
                layout: activeLayout,
                coverSize,
                theme,
                fontSize,
                lyricOffset,
                lyricLanguage,
                showLyrics,
                volume,
                playbackRate,
                quality,
                crossfadeDuration,
                gaplessPlayback,
                autoPlay,
                showSpectrum,
                reduceAnimations,
                highContrast
            }) !== JSON.stringify(DEFAULT_SETTINGS);
        },

        get isAccessibilityMode() {
            return reduceAnimations || highContrast;
        },

        get isPerformanceMode() {
            return quality === 'low' || reduceAnimations;
        }
    };
};