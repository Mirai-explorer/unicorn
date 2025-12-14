// utils/lyricUtils.ts
/**
 * 歌词处理工具函数
 */

import { LyricLine, LyricResponse } from '@/types';

export class LyricParser {
    /**
     * 解析 LRC 格式歌词
     */
    static parseLRC(lrcText: string): LyricLine[] {
        if (!lrcText.trim()) {
            return [];
        }

        const lines = lrcText.split('\n');
        const result: LyricLine[] = [];

        for (const line of lines) {
            // 匹配时间标签 [mm:ss.xx] 或 [mm:ss:xx]
            const match = line.match(/\[(\d+):(\d+)\.(\d+)\](.*)/) ||
                line.match(/\[(\d+):(\d+):(\d+)\](.*)/);

            if (match) {
                const [, minutes, seconds, milliseconds, text] = match;

                // 计算总毫秒数
                const time =
                    parseInt(minutes, 10) * 60 * 1000 +
                    parseInt(seconds, 10) * 1000 +
                    parseInt(milliseconds, 10);

                const trimmedText = text.trim();
                if (trimmedText) {
                    result.push({
                        time,
                        text: trimmedText
                    });
                }
            }
        }

        // 按时间排序
        return result.sort((a, b) => a.time - b.time);
    }

    /**
     * 解析多语言歌词
     */
    static parseMultiLanguageLRC(original: string, translated?: string, romaji?: string): {
        original: LyricLine[];
        translated: LyricLine[];
        romaji: LyricLine[];
    } {
        return {
            original: this.parseLRC(original),
            translated: translated ? this.parseLRC(translated) : [],
            romaji: romaji ? this.parseLRC(romaji) : []
        };
    }

    /**
     * 根据时间查找当前歌词行
     */
    static findCurrentLine(lyrics: LyricLine[], currentTime: number, offset: number = 0): number {
        const adjustedTime = currentTime * 1000 + offset;

        if (lyrics.length === 0) {
            return -1;
        }

        // 二分查找当前歌词行
        let left = 0;
        let right = lyrics.length - 1;
        let result = -1;

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);

            if (lyrics[mid].time <= adjustedTime) {
                result = mid;
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return result;
    }

    /**
     * 获取当前显示的歌词行（包括前后文）
     */
    static getDisplayLines(
        lyrics: LyricLine[],
        currentIndex: number,
        contextLines: number = 2
    ): { previous: LyricLine[]; current: LyricLine | null; next: LyricLine[] } {
        const previous = lyrics.slice(
            Math.max(0, currentIndex - contextLines),
            currentIndex
        );

        const current = currentIndex >= 0 && currentIndex < lyrics.length
            ? lyrics[currentIndex]
            : null;

        const next = lyrics.slice(
            currentIndex + 1,
            currentIndex + 1 + contextLines
        );

        return { previous, current, next };
    }

    /**
     * 计算歌词行进度（卡拉OK效果）
     */
    static calculateLineProgress(
        currentLine: LyricLine,
        nextLine: LyricLine | null,
        currentTime: number,
        offset: number = 0
    ): number {
        const adjustedTime = currentTime * 1000 + offset;
        const currentLineTime = currentLine.time;
        const nextLineTime = nextLine ? nextLine.time : currentLineTime + 5000; // 默认5秒

        const lineDuration = nextLineTime - currentLineTime;
        const elapsed = adjustedTime - currentLineTime;

        return Math.max(0, Math.min(1, elapsed / lineDuration));
    }

    /**
     * 搜索歌词文本
     */
    static searchLyrics(lyrics: LyricLine[], keyword: string): Array<{
        index: number;
        line: LyricLine;
        match: string;
        startIndex: number;
        endIndex: number;
    }> {
        if (!keyword.trim()) return [];

        const results: Array<{
            index: number;
            line: LyricLine;
            match: string;
            startIndex: number;
            endIndex: number;
        }> = [];

        const lowerKeyword = keyword.toLowerCase();

        lyrics.forEach((line, index) => {
            const lowerText = line.text.toLowerCase();
            const startIndex = lowerText.indexOf(lowerKeyword);

            if (startIndex !== -1) {
                results.push({
                    index,
                    line,
                    match: line.text,
                    startIndex,
                    endIndex: startIndex + keyword.length
                });
            }
        });

        return results;
    }

    /**
     * 生成歌词响应对象
     */
    static createLyricResponse(
        lyrics: string,
        source: 'kugou' | 'netease' | 'local' | 'custom',
        translations?: string[],
        romaji?: string[]
    ): LyricResponse {
        const parsedLyrics = this.parseLRC(lyrics);

        return {
            lyrics,
            translations,
            romaji,
            source: {
                provider: source,
                id: `${source}_${Date.now()}`,
                quality: this.calculateLyricQuality(parsedLyrics),
                language: 'zh',
                hasTranslation: !!(translations && translations.length > 0),
                hasRomaji: !!(romaji && romaji.length > 0)
            },
            offset: 0,
            quality: this.calculateLyricQuality(parsedLyrics)
        };
    }

    /**
     * 计算歌词质量评分
     */
    private static calculateLyricQuality(lyrics: LyricLine[]): number {
        if (lyrics.length === 0) return 0;

        // 基于歌词数量、时间覆盖度等计算质量
        const lineCountScore = Math.min(lyrics.length / 50, 1); // 最多50行
        const timeCoverage = this.calculateTimeCoverage(lyrics);
        const syncQuality = this.calculateSyncQuality(lyrics);

        return (lineCountScore * 0.3 + timeCoverage * 0.4 + syncQuality * 0.3);
    }

    /**
     * 计算时间覆盖度
     */
    private static calculateTimeCoverage(lyrics: LyricLine[]): number {
        if (lyrics.length < 2) return 0;

        const totalDuration = lyrics[lyrics.length - 1].time - lyrics[0].time;
        if (totalDuration <= 0) return 0;

        // 假设每行歌词平均持续3秒
        const estimatedCoverage = (lyrics.length * 3000) / totalDuration;
        return Math.min(estimatedCoverage, 1);
    }

    /**
     * 计算同步质量
     */
    private static calculateSyncQuality(lyrics: LyricLine[]): number {
        if (lyrics.length < 2) return 0;

        // 检查时间顺序是否正确
        for (let i = 1; i < lyrics.length; i++) {
            if (lyrics[i].time < lyrics[i - 1].time) {
                return 0.5; // 时间顺序错误，质量减半
            }
        }

        return 1;
    }
}