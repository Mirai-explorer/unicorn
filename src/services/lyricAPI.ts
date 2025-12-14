// services/lyricAPI.ts
export interface LyricResponse {
    lyrics: string;
    source: 'kugou' | 'netease' | 'local';
    translations?: string[];
}

class LyricAPI {
    static async fetchFromKugou(trackId: string, trackTitle: string, artist: string): Promise<LyricResponse | null> {
        try {
            const lyricText = await this.getKugouLyricText(trackId, trackTitle, artist);
            return lyricText ? {
                lyrics: lyricText,
                source: 'kugou'
            } : null;
        } catch (error) {
            console.warn('Failed to fetch lyrics from Kugou:', error);
            return null;
        }
    }

    static async fetchFromNetease(trackId: string): Promise<LyricResponse | null> {
        try {
            const lyricText = await this.getNeteaseLyricText(trackId);
            return lyricText ? {
                lyrics: lyricText,
                source: 'netease'
            } : null;
        } catch (error) {
            console.warn('Failed to fetch lyrics from Netease:', error);
            return null;
        }
    }

    static async fetchFromLocal(trackTitle: string, artist: string): Promise<LyricResponse | null> {
        try {
            const lyricText = await this.getLocalLyricText(trackTitle, artist);
            return lyricText ? {
                lyrics: lyricText,
                source: 'local'
            } : null;
        } catch (error) {
            console.warn('Failed to fetch local lyrics:', error);
            return null;
        }
    }

    /**
     * 从酷狗音乐获取歌词
     */
    private static async getKugouLyricText(trackId: string, trackTitle: string, artist: string): Promise<string | null> {
        try {
            // 酷狗音乐 API 示例
            const response = await fetch(`https://lyrics.kugou.com/search?ver=1&man=yes&client=pc&keyword=${encodeURIComponent(`${trackTitle} ${artist}`)}`);

            if (!response.ok) {
                throw new Error(`Kugou API error: ${response.status}`);
            }

            const data = await response.json();

            if (data.candidates && data.candidates.length > 0) {
                const bestMatch = data.candidates[0];
                const lyricResponse = await fetch(`https://lyrics.kugou.com/download?ver=1&client=pc&id=${bestMatch.id}&accesskey=${bestMatch.accesskey}&fmt=lrc&charset=utf8`);

                if (lyricResponse.ok) {
                    const lyricData = await lyricResponse.json();
                    return lyricData.content || null;
                }
            }

            return null;
        } catch (error) {
            console.warn('Failed to fetch lyrics from Kugou:', error);
            return null;
        }
    }

    /**
     * 从网易云音乐获取歌词
     */
    private static async getNeteaseLyricText(trackId: string): Promise<string | null> {
        try {
            // 网易云音乐 API 示例
            const searchResponse = await fetch(`https://music.163.com/api/search/get?s=${encodeURIComponent(trackId)}&type=1&limit=1`);

            if (!searchResponse.ok) {
                throw new Error(`Netease search API error: ${searchResponse.status}`);
            }

            const searchData = await searchResponse.json();

            if (searchData.result?.songs?.length > 0) {
                const songId = searchData.result.songs[0].id;
                const lyricResponse = await fetch(`https://music.163.com/api/song/lyric?lv=-1&kv=-1&tv=-1&id=${songId}`);

                if (lyricResponse.ok) {
                    const lyricData = await lyricResponse.json();
                    return lyricData.lrc?.lyric || lyricData.klyric?.lyric || lyricData.tlyric?.lyric || null;
                }
            }

            return null;
        } catch (error) {
            console.warn('Failed to fetch lyrics from Netease:', error);
            return null;
        }
    }

    /**
     * 从本地资源获取歌词
     */
    static async getLocalLyricText(trackTitle: string, artist: string): Promise<string | null> {
        try {
            // 本地歌词文件路径（假设在 public/lyrics/ 目录下）
            const localPaths = [
                `/lyrics/${artist} - ${trackTitle}.lrc`,
                `/lyrics/${trackTitle}.lrc`,
                `/lyrics/${artist}/${trackTitle}.lrc`
            ];

            for (const path of localPaths) {
                try {
                    const response = await fetch(path);
                    if (response.ok) {
                        return await response.text();
                    }
                } catch {
                    // 继续尝试下一个路径
                    continue;
                }
            }

            return null;
        } catch (error) {
            console.warn('Failed to fetch local lyrics:', error);
            return null;
        }
    }

    /**
     * 缓存方法
     */

    private static cache = new Map<string, { data: LyricResponse | null; timestamp: number }>();
    private static CACHE_DURATION = 10 * 60 * 1000; // 10分钟

    private static getCacheKey(trackId: string, languageMode: string): string {
        return `${trackId}-${languageMode}`;
    }

    private static getFromCache(cacheKey: string): LyricResponse | null {
        const cached = this.cache.get(cacheKey);
        if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
            return cached.data;
        }
        return null;
    }

    private static setToCache(cacheKey: string, data: LyricResponse | null): void {
        this.cache.set(cacheKey, {
            data,
            timestamp: Date.now()
        });

        // 简单的缓存清理
        if (this.cache.size > 100) {
            const firstKey = this.cache.keys().next().value;
            if (firstKey) this.cache.delete(firstKey);
        }
    }


    /**
     * 通用歌词获取方法（按优先级尝试多个源）
     */
    static async fetchLyrics(
        trackId: string,
        trackTitle: string,
        artist: string,
        languageMode: string = 'original'
    ): Promise<LyricResponse | null> {
        const cacheKey = this.getCacheKey(trackId, languageMode);

        // 检查缓存
        const cached = this.getFromCache(cacheKey);
        if (cached) {
            return cached;
        }

        // 从多个来源尝试获取歌词
        const sources = [
            () => this.fetchFromKugou(trackId, trackTitle, artist),
            () => this.fetchFromNetease(trackId),
            () => this.fetchFromLocal(trackTitle, artist)
        ];

        let lyricResponse: LyricResponse | null = null;

        for (const source of sources) {
            try {
                lyricResponse = await source();
                if (lyricResponse?.lyrics) break;
            } catch (err) {
                continue;
            }
        }

        // 缓存结果（包括 null）
        this.setToCache(cacheKey, lyricResponse);

        return lyricResponse;
    }
}

export default LyricAPI;