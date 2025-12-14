// types/lyrics.ts
/**
 * 歌词相关类型定义
 *
 * 负责管理歌词的解析、显示、同步和配置等核心功能
 * 支持多语言歌词、多种显示模式和高级同步功能
 */

// ==================== 歌词数据结构 ====================

/**
 * 单行歌词数据
 * @description 歌词文件中的单行歌词信息，包含时间和文本内容
 */
export interface LyricLine {
    time: number;           // 歌词出现的时间点（毫秒）
    text: string;           // 歌词文本内容
    duration?: number;      // 歌词显示持续时间（毫秒）
    translation?: string;   // 翻译文本（如有）
    romaji?: string;        // 罗马音文本（如有）
    highlight?: boolean;    // 是否处于高亮状态（当前播放行）
    originalText?: string;  // 原始文本（用于双语显示）
}

/**
 * 歌词语言显示模式
 * @description 控制歌词的语言显示组合方式
 */
export type LyricLanguage =
    | 'original'    // 仅显示原语言歌词
    | 'translated'  // 仅显示翻译歌词
    | 'romaji'      // 仅显示罗马音
    | 'both'        // 原语言 + 翻译（双语显示）
    | 'all';        // 原语言 + 翻译 + 罗马音（全显示）

/**
 * 歌词显示效果模式
 * @description 控制歌词的视觉呈现方式和动画效果
 */
export type LyricDisplayMode =
    | 'static'      // 静态显示：仅高亮当前行
    | 'karaoke'     // 卡拉OK模式：逐字高亮效果
    | 'highlight'   // 高亮模式：平滑的颜色过渡
    | 'scroll';     // 滚动模式：歌词平滑滚动

/**
 * 歌词文本对齐方式
 * @description 控制歌词文本在容器中的水平对齐
 */
export type LyricAlignment =
    | 'left'    // 左对齐：传统歌词显示方式
    | 'center'  // 居中对齐：现代播放器常用
    | 'right';  // 右对齐：特殊布局需求

// ==================== 歌词源信息 ====================

/**
 * 歌词来源信息
 * @description 记录歌词数据的来源和质量信息
 */
export interface LyricSource {
    provider:                  // 歌词提供方
        | 'kugou'     // 酷狗音乐
        | 'netease'   // 网易云音乐
        | 'local'     // 本地文件
        | 'custom';   // 自定义来源
    id: string;               // 歌词唯一标识
    url?: string;             // 歌词文件URL（远程源）
    quality: number;          // 歌词质量评分 0.0 - 1.0
    language: string;         // 歌词语言代码（如 'zh-CN', 'ja-JP'）
    hasTranslation: boolean;  // 是否包含翻译歌词
    hasRomaji: boolean;       // 是否包含罗马音
    timestamp?: number;       // 歌词更新时间戳
    author?: string;          // 歌词作者/贡献者
}

/**
 * 歌词获取响应
 * @description 歌词API返回的完整歌词数据
 */
export interface LyricResponse {
    lyrics: string;           // 原始歌词内容（LRC格式字符串）
    translations?: string[];  // 翻译歌词数组（多段翻译）
    romaji?: string[];        // 罗马音歌词数组
    source: LyricSource;      // 歌词来源信息
    offset?: number;          // 时间偏移量（毫秒），用于校准
    quality: number;          // 整体质量评分 0-1
    cacheKey?: string;        // 缓存键名（用于重复请求）
    duration?: number;        // 歌词对应音频时长
}

// ==================== 歌词同步状态 ====================

/**
 * 歌词同步状态
 * @description 实时跟踪歌词与音频的同步状态
 */
export interface LyricSyncState {
    currentLineIndex: number;     // 当前高亮行索引
    previousLineIndex: number;    // 上一行索引（用于过渡效果）
    nextLineIndex: number;        // 下一行索引（用于预加载）
    progress: number;             // 当前行播放进度 0.0 - 1.0
    isSynced: boolean;            // 是否已成功同步
    lastSyncTime: number;         // 最后同步时间戳
    drift: number;                // 时间漂移量（毫秒）
    confidence: number;           // 同步置信度 0.0 - 1.0
}

// ==================== 歌词搜索与匹配 ====================

/**
 * 歌词搜索匹配结果
 * @description 在歌词中搜索关键词的匹配信息
 */
export interface LyricMatch {
    index: number;          // 匹配行的索引
    line: LyricLine;        // 匹配的歌词行
    match: string;          // 匹配的文本片段
    startIndex: number;     // 匹配开始位置（字符索引）
    endIndex: number;       // 匹配结束位置（字符索引）
    score: number;          // 匹配得分 0.0 - 1.0
    context?: {             // 上下文信息
        prevLine?: LyricLine;   // 前一行歌词
        nextLine?: LyricLine;   // 后一行歌词
    };
}

/**
 * 歌词搜索选项
 * @description 歌词文本搜索的配置参数
 */
export interface LyricSearchOptions {
    caseSensitive?: boolean;    // 是否区分大小写
    wholeWord?: boolean;        // 是否全词匹配
    fuzzy?: boolean;            // 是否模糊搜索
    maxResults?: number;        // 最大结果数量
    includeTranslations?: boolean; // 是否搜索翻译文本
    includeRomaji?: boolean;    // 是否搜索罗马音
}

// ==================== 歌词统计分析 ====================

/**
 * 歌词统计信息
 * @description 歌词文件的元数据和质量统计
 */
export interface LyricStats {
    totalLines: number;         // 总行数
    totalDuration: number;      // 覆盖的总时长（毫秒）
    language: string;           // 主要语言
    hasTranslation: boolean;    // 是否包含翻译
    hasRomaji: boolean;         // 是否包含罗马音
    syncQuality: number;        // 同步质量评分 0.0 - 1.0
    density: number;            // 歌词密度（行数/分钟）
    coverage: number;          // 时间覆盖率 0.0 - 1.0
    languages: string[];       // 包含的所有语言
    characterCount: number;    // 总字符数
    lineLengths: {             // 行长度统计
        min: number;           // 最短行字符数
        max: number;           // 最长行字符数
        average: number;       // 平均行字符数
    };
}

// ==================== 歌词显示配置 ====================

/**
 * 歌词显示配置
 * @description 控制歌词视觉表现的所有可配置选项
 */
export interface LyricConfig {
    // 基本显示设置
    fontSize: number;               // 字体大小（像素）
    offset: number;                 // 时间偏移量（毫秒）
    language: LyricLanguage;        // 语言显示模式
    displayMode: LyricDisplayMode;  // 显示效果模式
    alignment: LyricAlignment;      // 文本对齐方式

    // 颜色主题
    highlightColor: string;         // 高亮颜色（当前行）
    backgroundColor: string;        // 背景颜色
    textColor: string;              // 普通文本颜色
    translationColor: string;       // 翻译文本颜色
    romajiColor: string;            // 罗马音文本颜色

    // 视觉效果
    showBackground: boolean;        // 是否显示背景
    autoScroll: boolean;            // 是否自动滚动
    karaokeEffect: boolean;         // 是否启用卡拉OK效果
    smoothScrolling: boolean;       // 是否平滑滚动
    blurEffect: boolean;            // 是否启用模糊效果

    // 高级选项
    lineSpacing: number;            // 行间距倍数
    maxLines: number;               // 最大显示行数
    transitionDuration: number;     // 过渡动画时长（毫秒）
    highlightDuration: number;      // 高亮持续时间（毫秒）
}

// ==================== 歌词解析结果 ====================

/**
 * 歌词解析结果
 * @description 歌词文件解析后的结构化数据
 */
export interface ParsedLyrics {
    lines: LyricLine[];             // 解析后的歌词行数组
    metadata: {                     // 元数据信息
        title?: string;             // 歌曲标题
        artist?: string;            // 艺术家
        album?: string;             // 专辑名称
        author?: string;            // 歌词作者
        length?: string;            // 歌曲时长
        offset?: number;            // 全局偏移量
    };
    source: LyricSource;            // 来源信息
    stats: LyricStats;              // 统计信息
}

// ==================== 常量定义 ====================

/**
 * 默认歌词配置
 * @description 歌词显示的默认视觉配置
 */
export const DEFAULT_LYRIC_CONFIG: LyricConfig = {
    // 基本显示
    fontSize: 16,
    offset: 0,
    language: 'original',
    displayMode: 'static',
    alignment: 'center',

    // 颜色主题
    highlightColor: '#ff6b6b',
    backgroundColor: 'transparent',
    textColor: '#ffffff',
    translationColor: '#a0a0a0',
    romajiColor: '#888888',

    // 视觉效果
    showBackground: false,
    autoScroll: true,
    karaokeEffect: false,
    smoothScrolling: true,
    blurEffect: false,

    // 高级选项
    lineSpacing: 1.5,
    maxLines: 10,
    transitionDuration: 300,
    highlightDuration: 200
} as const;

/**
 * 支持的语言模式
 * @description 可用的歌词语言显示组合
 */
export const LYRIC_LANGUAGES = [
    'original',
    'translated',
    'romaji',
    'both',
    'all'
] as const;

/**
 * 支持的显示模式
 * @description 可用的歌词视觉效果模式
 */
export const DISPLAY_MODES = [
    'static',
    'karaoke',
    'highlight',
    'scroll'
] as const;

/**
 * 歌词质量等级
 * @description 歌词质量的评级标准
 */
export const LYRIC_QUALITY_LEVELS = {
    EXCELLENT: 0.9,     // 优秀：时间精准，文本完整
    GOOD: 0.7,          // 良好：少量时间偏差
    FAIR: 0.5,          // 一般：明显时间偏差
    POOR: 0.3,          // 较差：严重时间问题
    UNUSABLE: 0.1       // 不可用：无法同步
} as const;

// ==================== 工具类型 ====================

/**
 * 歌词事件类型
 * @description 歌词相关的生命周期事件
 */
export interface LyricEvents {
    'lineChange': { previous: LyricLine | null; current: LyricLine };
    'syncStateChange': LyricSyncState;
    'configChange': Partial<LyricConfig>;
    'searchComplete': LyricMatch[];
}

/**
 * 歌词搜索参数
 * @description 歌词文本搜索的请求参数
 */
export interface LyricSearchParams {
    query: string;
    options?: LyricSearchOptions;
    maxResults?: number;
}