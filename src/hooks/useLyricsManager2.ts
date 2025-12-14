// hooks/useLyricsManager2.ts
import { useState, useCallback, useMemo } from 'react';
import { LyricLine, LyricLanguage } from '@/types';
import { LyricParser } from '@/utils';
import LyricAPI from "@/services/lyricAPI";

export const useLyricsManager2 = () => {
    // 🎯 歌词数据状态
    const [originalLyrics, setOriginalLyrics] = useState<LyricLine[]>([]);
    const [translatedLyrics, setTranslatedLyrics] = useState<LyricLine[]>([]);
    const [romanizedLyrics, setRomanizedLyrics] = useState<LyricLine[]>([]);

    // 🎯 显示状态
    const [currentLineIndex, setCurrentLineIndex] = useState(-1);
    const [previousLineIndex, setPreviousLineIndex] = useState(-1);
    const [nextLineIndex, setNextLineIndex] = useState(-1);

    // 🎯 设置状态
    const [languageMode, setLanguageMode] = useState<LyricLanguage>('original');
    const [offset, setOffsetState] = useState(400); // 毫秒偏移，默认350ms覆盖动画过渡时间
    const [fontSize, setFontSizeState] = useState(18);
    const [isLyricVisible, setIsLyricVisible] = useState(true);

    // 🎯 加载状态
    const [isLoading, setIsLoading] = useState(false);
    const [loadError, setLoadError] = useState<string | null>(null);

    // 🎯 解析歌词文本
    const parseLyrics = useCallback((lyricText: string, type: 'original' | 'translated' | 'romanized' = 'original') => {
        if (!lyricText.trim()) {
            return [];
        }

        try {
            const parsed = LyricParser.parseLRC(lyricText);

            switch (type) {
                case 'original':
                    setOriginalLyrics(parsed);
                    break;
                case 'translated':
                    setTranslatedLyrics(parsed);
                    break;
                case 'romanized':
                    setRomanizedLyrics(parsed);
                    break;
            }

            return parsed;
        } catch (error) {
            console.error('歌词解析失败:', error);
            setLoadError('歌词格式错误');
            return [];
        }
    }, []);

    // 🎯 加载歌词（支持多种来源）
    const loadLyrics = useCallback(async (trackId: string, trackTitle: string, artist: string) => {
        if (!trackId) return [];

        setIsLoading(true);
        setLoadError(null);

        try {
            const lyricResponse = await LyricAPI.fetchLyrics(trackId, trackTitle, artist, languageMode);

            if (!lyricResponse?.lyrics) {
                throw new Error('无法获取歌词');
            }

            const parsedLyrics = parseLyrics(lyricResponse.lyrics, 'original');
            setOriginalLyrics(parsedLyrics);

            if (lyricResponse.translations?.[0]) {
                const translated = parseLyrics(lyricResponse.translations[0], 'translated');
                setTranslatedLyrics(translated);
            } else {
                setTranslatedLyrics([]);
            }

            return parsedLyrics;
        } catch (error) {
            const errorMsg = error instanceof Error ? error.message : '歌词加载失败';
            setLoadError(errorMsg);
            setOriginalLyrics([]);
            setTranslatedLyrics([]);
            return [];
        } finally {
            setIsLoading(false);
        }
    }, [languageMode, parseLyrics]);

    // 🎯 清除歌词
    const clearLyrics = useCallback(() => {
        setOriginalLyrics([]);
        setTranslatedLyrics([]);
        setRomanizedLyrics([]);
        setCurrentLineIndex(-1);
        setPreviousLineIndex(-1);
        setNextLineIndex(-1);
        setLoadError(null);
    }, []);

    // 🎯 根据时间同步歌词
    const syncLyrics = useCallback((currentTime: number) => {
        const adjustedTime = currentTime * 1000 + offset; // 转换为毫秒并应用偏移

        if (originalLyrics.length === 0) {
            setCurrentLineIndex(-1);
            setPreviousLineIndex(-1);
            setNextLineIndex(-1);
            return -1;
        }

        // 找到当前时间对应的歌词行
        let currentIndex = -1;

        for (let i = 0; i < originalLyrics.length; i++) {
            if (originalLyrics[i].time <= adjustedTime) {
                currentIndex = i;
            } else {
                break;
            }
        }

        // 更新当前、前一句、后一句的索引
        setPreviousLineIndex(currentIndex > 0 ? currentIndex - 1 : -1);
        setCurrentLineIndex(currentIndex);
        setNextLineIndex(currentIndex < originalLyrics.length - 1 ? currentIndex + 1 : -1);

        return currentIndex;
    }, [originalLyrics, offset]);

    // 🎯 获取当前显示的歌词
    const getDisplayLyrics = useCallback(() => {
        let lyricsToShow: LyricLine[] = [];

        switch (languageMode) {
            case 'original':
                lyricsToShow = originalLyrics;
                break;
            case 'translated':
                lyricsToShow = translatedLyrics.length > 0 ? translatedLyrics : originalLyrics;
                break;
            case 'both':
                // 合并显示原文和翻译
                lyricsToShow = originalLyrics.map((line, index) => ({
                    ...line,
                    text: translatedLyrics[index]
                        ? `${line.text}\n${translatedLyrics[index].text}`
                        : line.text
                }));
                break;
        }

        return lyricsToShow;
    }, [languageMode, originalLyrics, translatedLyrics]);

    // 🎯 获取当前行歌词
    const getCurrentLine = useCallback(() => {
        const displayLyrics = getDisplayLyrics();
        return currentLineIndex >= 0 && currentLineIndex < displayLyrics.length
            ? displayLyrics[currentLineIndex]
            : null;
    }, [currentLineIndex, getDisplayLyrics]);

    // 🎯 获取前一句歌词
    const getPreviousLine = useCallback(() => {
        const displayLyrics = getDisplayLyrics();
        return previousLineIndex >= 0 && previousLineIndex < displayLyrics.length
            ? displayLyrics[previousLineIndex]
            : null;
    }, [previousLineIndex, getDisplayLyrics]);

    // 🎯 获取下一句歌词
    const getNextLine = useCallback(() => {
        const displayLyrics = getDisplayLyrics();
        return nextLineIndex >= 0 && nextLineIndex < displayLyrics.length
            ? displayLyrics[nextLineIndex]
            : null;
    }, [nextLineIndex, getDisplayLyrics]);

    // 🎯 偏移量设置（带边界检查）
    const setOffset = useCallback((newOffset: number) => {
        // 限制偏移量在合理范围内（-5000ms 到 +5000ms）
        const clampedOffset = Math.max(-5000, Math.min(5000, newOffset));
        setOffsetState(clampedOffset);
    }, []);

    // 🎯 字体大小设置（带边界检查）
    const setFontSize = useCallback((newSize: number) => {
        const clampedSize = Math.max(12, Math.min(32, newSize));
        setFontSizeState(clampedSize);
    }, []);

    // 🎯 歌词搜索（根据文本搜索歌词）
    const searchLyrics = useCallback((keyword: string): Array<{ index: number; line: LyricLine; match: string }> => {
        if (!keyword.trim()) return [];

        const displayLyrics = getDisplayLyrics();
        const results: Array<{ index: number; line: LyricLine; match: string }> = [];

        displayLyrics.forEach((line, index) => {
            if (line.text.toLowerCase().includes(keyword.toLowerCase())) {
                results.push({ index, line, match: line.text });
            }
        });

        return results;
    }, [getDisplayLyrics]);

    // 🎯 跳转到指定歌词行
    const jumpToLine = useCallback((lineIndex: number, onSeek?: (time: number) => void) => {
        const displayLyrics = getDisplayLyrics();

        if (lineIndex >= 0 && lineIndex < displayLyrics.length) {
            const targetTime = displayLyrics[lineIndex].time / 1000; // 转换回秒
            onSeek?.(targetTime);
            return targetTime;
        }

        return -1;
    }, [getDisplayLyrics]);

    // 🎯 计算属性
    const displayLyrics = useMemo(() => getDisplayLyrics(), [getDisplayLyrics]);

    const currentLine = useMemo(() => getCurrentLine(), [getCurrentLine]);
    const previousLine = useMemo(() => getPreviousLine(), [getPreviousLine]);
    const nextLine = useMemo(() => getNextLine(), [getNextLine]);

    const hasLyrics = useMemo(() => originalLyrics.length > 0, [originalLyrics]);
    const hasTranslation = useMemo(() => translatedLyrics.length > 0, [translatedLyrics]);

    const lyricProgress = useMemo(() => {
        if (!hasLyrics || currentLineIndex < 0) return 0;
        return (currentLineIndex / originalLyrics.length) * 100;
    }, [hasLyrics, currentLineIndex, originalLyrics.length]);

    // 🎯 歌词行时间范围
    const getLineTimeRange = useCallback((lineIndex: number) => {
        const displayLyrics = getDisplayLyrics();

        if (lineIndex < 0 || lineIndex >= displayLyrics.length) {
            return { start: 0, end: 0 };
        }

        const startTime = displayLyrics[lineIndex].time / 1000;
        const endTime = lineIndex < displayLyrics.length - 1
            ? displayLyrics[lineIndex + 1].time / 1000
            : startTime + 5; // 默认5秒

        return { start: startTime, end: endTime };
    }, [getDisplayLyrics]);

    return {
        // === 状态 ===
        // 歌词数据
        originalLyrics,
        translatedLyrics,
        romanizedLyrics,

        // 显示状态
        currentLineIndex,
        previousLineIndex,
        nextLineIndex,
        currentLine,
        previousLine,
        nextLine,

        // 设置状态
        languageMode,
        offset,
        fontSize,
        isLyricVisible,

        // 加载状态
        isLoading,
        loadError,

        // === 计算方法 ===
        displayLyrics,
        hasLyrics,
        hasTranslation,
        lyricProgress,

        // === 控制方法 ===
        // 歌词管理
        parseLyrics,
        loadLyrics,
        clearLyrics,
        syncLyrics,

        // 显示控制
        setLanguageMode,
        setOffset,
        setFontSize,
        setIsLyricVisible,

        // 工具方法
        searchLyrics,
        jumpToLine,
        getLineTimeRange,

        // === 状态检查 ===
        get isSyncing() { return currentLineIndex >= 0; },
        get hasMultipleLanguages() { return hasTranslation; },
        get canShowTranslation() { return languageMode !== 'original' && hasTranslation; }
    };
};