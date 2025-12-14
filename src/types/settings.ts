// types/settings.ts
import { PlaybackMode, QualityLevel } from "@/types/audio";
import { AnimationMode, ControlPosition, CoverSize, PlayerLayout, ThemeMode } from "@/types/ui";
import { LyricLanguage } from "@/types/lyrics";

/**
 * 播放器设置相关类型定义
 *
 * 负责管理用户的所有个性化配置，包括音频、界面、播放行为等设置
 * 采用模块化设计，便于分类管理和按需更新
 */

// ==================== 音频设置 ====================

/**
 * 音频处理设置
 * @description 控制音频播放的质量、效果和高级功能
 */
export interface AudioSettings {
    volume?: number;                // 主音量控制 0.0 - 1.0
    playbackRate?: number;          // 播放速度 0.5 - 2.0
    quality?: QualityLevel;         // 音频质量等级
    crossfadeDuration?: number;     // 交叉淡入淡出时长(秒) 0-10
    gaplessPlayback?: boolean;      // 是否启用无缝播放
    normalizeVolume?: boolean;      // 是否启用音量标准化
    bassBoost?: number;             // 低音增强强度 0-100
    equalizerPreset?: string;       // 均衡器预设名称
    spatialAudio?: boolean;         // 是否启用空间音频
    balance?: number;               // 声道平衡 -1.0(左) 到 1.0(右)
    monoAudio?: boolean;            // 是否强制单声道输出
}

// ==================== 歌词设置 ====================

/**
 * 歌词显示设置
 * @description 控制歌词的显示样式、语言和同步行为
 */
export interface LyricSettings {
    fontSize?: number;              // 歌词字体大小 12-32px
    lyricOffset?: number;           // 歌词时间偏移(毫秒) -5000 到 +5000
    lyricLanguage?: LyricLanguage;  // 首选歌词语言
    showLyrics?: boolean;           // 是否显示歌词
    highlightColor?: string;        // 当前行高亮颜色
    backgroundColor?: string;       // 歌词背景颜色
    showTranslation?: boolean;      // 是否显示翻译歌词
    showRomaji?: boolean;           // 是否显示罗马音
    syncMode?:                      // 歌词同步模式
        | 'auto'    // 自动同步：根据音频分析自动调整
        | 'manual'  // 手动同步：用户手动调整偏移
        | 'fixed';  // 固定偏移：使用预设偏移值
    alignment?:                     // 歌词对齐方式
        | 'left'    // 左对齐
        | 'center'  // 居中对齐
        | 'right';  // 右对齐
    lineHeight?: number;            // 歌词行高 1.0 - 2.0
}

// ==================== 播放设置 ====================

/**
 * 播放行为设置
 * @description 控制播放器的自动行为和高级播放功能
 */
export interface PlaybackSettings {
    autoPlay?: boolean;             // 是否自动播放下一曲
    autoNext?: boolean;             // 是否在播放结束时自动下一曲
    shuffle?: boolean;              // 是否启用随机播放
    repeatMode?: PlaybackMode;      // 重复播放模式
    fadeInOut?: boolean;            // 是否启用淡入淡出效果
    preventSleep?: boolean;         // 是否阻止系统休眠
    hardwareAcceleration?: boolean; // 是否启用硬件加速
    cacheSize?: number;             // 音频缓存大小(MB)
    resumePlayback?: boolean;       // 是否恢复上次播放位置
    maxQueueSize?: number;          // 播放队列最大长度
    skipSilence?: boolean;          // 是否跳过静音部分
}

// ==================== 界面设置 ====================

/**
 * 用户界面设置
 * @description 控制播放器的视觉表现和交互方式
 */
export interface DisplaySettings {
    language?: string;              // 界面语言代码 'zh-CN', 'en-US'等
    theme?: ThemeMode;              // 色彩主题模式
    layout?: PlayerLayout;          // 播放器布局模式
    coverSize?: CoverSize;          // 专辑封面尺寸
    animationMode?: AnimationMode;  // 动画效果级别
    showSpectrum?: boolean;         // 是否显示音频频谱
    showWaveform?: boolean;         // 是否显示波形图
    highContrast?: boolean;         // 是否启用高对比度模式
    reduceMotion?: boolean;         // 是否减少动画效果
    controlPosition?: ControlPosition; // 控制栏位置
    showRemainingTime?: boolean;    // 是否显示剩余时间
    compactMode?: boolean;          // 是否启用紧凑模式
    blurEffect?: boolean;           // 是否启用背景模糊效果
}

// ==================== 快捷键设置 ====================

/**
 * 键盘快捷键设置
 * @description 定义全局键盘快捷键的按键绑定
 */
export interface ShortcutSettings {
    playPause: string;              // 播放/暂停快捷键
    nextTrack: string;              // 下一曲快捷键
    previousTrack: string;          // 上一曲快捷键
    volumeUp: string;               // 音量增加快捷键
    volumeDown: string;             // 音量减少快捷键
    toggleMute: string;             // 静音切换快捷键
    toggleLyrics: string;           // 歌词显示切换快捷键
    togglePlaylist: string;         // 播放列表切换快捷键
    toggleFullscreen: string;       // 全屏切换快捷键
    seekForward: string;            // 快进快捷键
    seekBackward: string;           // 快退快捷键
    toggleShuffle: string;          // 随机播放切换快捷键
    toggleRepeat: string;           // 循环模式切换快捷键
}

// ==================== 存储设置 ====================

/**
 * 数据存储设置
 * @description 控制数据的保存、备份和缓存策略
 */
export interface StorageSettings {
    autoSave?: boolean;              // 是否自动保存设置
    backupInterval?: number;         // 自动备份间隔(小时)
    maxHistoryItems?: number;        // 播放历史最大记录数
    cacheEnabled?: boolean;          // 是否启用音频缓存
    cacheLocation?:                  // 缓存存储位置
        | 'memory'  // 仅内存缓存
        | 'local'   // 本地存储缓存
        | 'both';   // 内存和本地双重缓存
    exportFormat?:                   // 数据导出格式
        | 'json'    // JSON格式
        | 'csv'     // CSV格式
        | 'xml';    // XML格式
    syncAcrossDevices?: boolean;    // 是否跨设备同步设置
    cloudBackup?: boolean;          // 是否启用云备份
}

// ==================== 完整设置类型 ====================

/**
 * 播放器完整设置
 * @description 包含所有分类设置的综合配置对象
 */
export interface PlayerSettings {
    // 音频设置
    audio: AudioSettings;

    // 歌词设置
    lyrics: LyricSettings;

    // 播放设置
    playback: PlaybackSettings;

    // 界面设置
    display: DisplaySettings;

    // 快捷键设置
    shortcuts: ShortcutSettings;

    // 存储设置
    storage: StorageSettings;

    // 元数据
    version: string;                // 设置格式版本号
    lastModified: number;           // 最后修改时间戳
    created: number;                // 创建时间戳
    profileName?: string;           // 设置配置名称
}

// ==================== 设置预设 ====================

/**
 * 设置预设配置
 * @description 预定义的设置组合，便于快速切换不同使用场景
 */
export interface SettingsPreset {
    id: string;                     // 预设唯一标识
    name: string;                   // 预设显示名称
    description: string;            // 预设功能描述
    settings: Partial<PlayerSettings>; // 预设包含的设置项
    category:                       // 预设分类
        | 'audio'       // 音频优化预设
        | 'display'     // 界面显示预设
        | 'playback'    // 播放行为预设
        | 'lyrics'      // 歌词显示预设
        | 'all';        // 完整配置预设
    icon?: string;                  // 预设图标
    isDefault?: boolean;            // 是否为默认预设
    recommendedFor?: string;        // 推荐使用场景
}

// ==================== 设置变更记录 ====================

/**
 * 设置变更记录
 * @description 跟踪设置的历史变更，支持撤销和审计
 */
export interface SettingsChange {
    key: string;                    // 变更的设置键路径
    oldValue: unknown;              // 变更前的值
    newValue: unknown;              // 变更后的值
    timestamp: number;              // 变更时间戳
    source:                         // 变更来源
        | 'user'        // 用户手动修改
        | 'system'      // 系统自动调整
        | 'preset';     // 预设应用
    userId?: string;                // 操作用户标识
    sessionId?: string;             // 操作会话标识
}

// ==================== 常量定义 ====================

/**
 * 默认播放器设置
 * @description 播放器的初始默认配置
 */
export const DEFAULT_PLAYER_SETTINGS: PlayerSettings = {
    audio: {
        volume: 0.8,
        playbackRate: 1.0,
        quality: 'high',
        crossfadeDuration: 0,
        gaplessPlayback: true,
        normalizeVolume: false,
        bassBoost: 0,
        spatialAudio: false
    },
    lyrics: {
        fontSize: 16,
        lyricOffset: 0,
        lyricLanguage: 'original',
        showLyrics: true,
        highlightColor: '#ff6b6b',
        backgroundColor: 'transparent',
        showTranslation: false,
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
        cacheSize: 100,
        resumePlayback: true
    },
    display: {
        language: 'zh-CN',
        theme: 'auto',
        layout: 'classic',
        coverSize: 'default',
        animationMode: 'full',
        showSpectrum: false,
        showWaveform: true,
        highContrast: false,
        reduceMotion: false,
        controlPosition: 'bottom'
    },
    shortcuts: {
        playPause: 'Space',
        nextTrack: 'ArrowRight',
        previousTrack: 'ArrowLeft',
        volumeUp: 'ArrowUp',
        volumeDown: 'ArrowDown',
        toggleMute: 'KeyM',
        toggleLyrics: 'KeyL',
        togglePlaylist: 'KeyP',
        toggleFullscreen: 'KeyF',
        seekForward: 'Shift+ArrowRight',
        seekBackward: 'Shift+ArrowLeft',
        toggleShuffle: 'KeyS',
        toggleRepeat: 'KeyR'
    },
    storage: {
        autoSave: true,
        backupInterval: 24,
        maxHistoryItems: 1000,
        cacheEnabled: true,
        cacheLocation: 'both',
        exportFormat: 'json'
    },
    version: '1.0.0',
    lastModified: Date.now(),
    created: Date.now()
} as const;

/**
 * 预设配置集合
 * @description 内置的常用设置预设
 */
export const DEFAULT_PRESETS: SettingsPreset[] = [
    {
        id: 'default',
        name: '默认配置',
        description: '平衡性能和功能的默认设置',
        settings: {},
        category: 'all',
        isDefault: true
    },
    {
        id: 'audio-focused',
        name: '音质优先',
        description: '优化音频质量和播放效果',
        settings: {
            audio: {
                quality: 'lossless',
                normalizeVolume: true,
                spatialAudio: true,
                gaplessPlayback: true
            },
            playback: {
                hardwareAcceleration: true
            }
        },
        category: 'audio',
        recommendedFor: '音乐欣赏'
    },
    {
        id: 'performance',
        name: '性能模式',
        description: '优化资源占用，适合低性能设备',
        settings: {
            display: {
                animationMode: 'reduced',
                showWaveform: false,
                showSpectrum: false
            },
            playback: {
                hardwareAcceleration: false
            },
            storage: {
                cacheEnabled: false
            }
        },
        category: 'display',
        recommendedFor: '老旧设备'
    },
    {
        id: 'lyrics-theater',
        name: '歌词剧场',
        description: '专注于歌词显示的剧场模式',
        settings: {
            display: {
                layout: 'theater',
                coverSize: 'large'
            },
            lyrics: {
                fontSize: 20,
                showTranslation: true,
                alignment: 'center'
            }
        },
        category: 'lyrics',
        recommendedFor: '卡拉OK场景'
    }
] as const;

/**
 * 设置键路径类型
 * @description 用于类型安全的设置访问
 */
export type SettingsKeyPath =
    | `audio.${keyof AudioSettings}`
    | `lyrics.${keyof LyricSettings}`
    | `playback.${keyof PlaybackSettings}`
    | `display.${keyof DisplaySettings}`
    | `shortcuts.${keyof ShortcutSettings}`
    | `storage.${keyof StorageSettings}`;