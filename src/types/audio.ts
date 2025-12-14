// types/audio.ts
// DONE: 实现音频管理设计 - 2025/11/21

/**
 * 音频播放相关类型定义
 *
 * 负责管理音频播放的核心数据结构和业务逻辑
 * 包含音频源处理、播放控制、错误处理和状态管理等完整功能
 */

// ==================== 音频源类型 ====================

/**
 * 酷狗音乐音频源数据
 * @description 酷狗音乐平台返回的音频数据格式
 */
export interface AudioSourceKugou {
    play_url: string;                   // 音频播放地址
    song_name: string;                  // 歌曲名称
    album_name: string;                 // 专辑名称
    author_name: string;                // 作者/艺术家名称
    img: string;                        // 专辑封面图片URL
    lyrics: string;                     // 歌词内容（LRC格式）
    album_id: string;                   // 专辑ID
    encode_album_audio_id: string;      // 编码后的音频ID
    hash: string;                       // 音频文件哈希值
    is_free_part: boolean;              // 是否为免费部分
    timelength: number;                 // 音频时长（毫秒）
    trans_param: {                      // 转换参数
        hash_offset: {
            end_ms: number;             // 哈希偏移结束时间
        };
    };
    bitrate: number;                    // 比特率（kbps）
    filesize: number;                   // 文件大小（字节）
}

/**
 * 网易云音乐音频源数据
 * @description 网易云音乐平台返回的音频数据格式
 */
export interface AudioSourceNetease {
    al: {                               // 专辑信息
        id: number;                     // 专辑ID
        name: string;                   // 专辑名称
        picUrl: string;                 // 专辑封面URL
    };
    alia: string[];                     // 别名数组
    ar: Array<{                         // 艺术家信息
        id: number;                     // 艺术家ID
        name: string;                   // 艺术家名称
    }>;
    dt: number;                         // 音频时长（毫秒）
    mp3: {                              // MP3音频信息
        id: number;                     // 音频ID
        md5: string;                    // 音频MD5值
        time: number;                   // 音频时长
        url: string;                    // 音频播放地址
    };
    name: string;                       // 歌曲名称
}

/**
 * 统一音频源类型
 * @description 支持多种音频来源的联合类型
 */
export type AudioSource =
    | AudioSourceKugou      // 酷狗音乐源
    | AudioSourceNetease    // 网易云音乐源
    | File                  // 本地文件对象
    | string;               // 音频URL字符串

/**
 * 音频源类型标识
 * @description 标识音频数据的来源类型
 */
export type AudioSourceType =
    | 'kugou'      // 酷狗音乐平台
    | 'netease'    // 网易云音乐平台
    | 'local'      // 本地文件系统
    | 'url'        // 网络URL地址
    | 'file';      // 文件对象

// ==================== 播放控制 ====================

/**
 * 播放模式
 * @description 控制音频播放的顺序和循环行为
 */
export type PlaybackMode =
    | 'sequential'   // 顺序播放：按列表顺序播放，到末尾停止
    | 'repeat-one'   // 单曲循环：重复播放当前曲目
    | 'repeat-all'   // 列表循环：播放完列表后重新开始
    | 'shuffle';     // 随机播放：随机选择曲目播放

/**
 * 音频加载状态
 * @description 表示音频元素在不同阶段的生命周期状态
 */
export type AudioLoadState =
    | 'idle'         // 空闲：未加载任何音频
    | 'loading'      // 加载中：正在加载音频数据
    | 'loaded'       // 加载完成：音频数据已加载完成
    | 'playing'      // 播放中：音频正在播放
    | 'paused'       // 已暂停：音频已暂停播放
    | 'ended'        // 播放结束：音频播放已完成
    | 'error';       // 错误状态：音频加载或播放出错

// ==================== 错误处理 ====================

/**
 * 播放错误类型
 * @description 音频播放过程中可能发生的错误类型分类
 */
export type PlaybackErrorType =
    | 'network_error'       // 网络错误：音频文件加载失败
    | 'format_error'        // 格式错误：音频格式不被支持
    | 'decode_error'        // 解码错误：音频数据解码失败
    | 'permission_error'    // 权限错误：缺少播放权限
    | 'abort_error'         // 中止错误：用户主动中止播放
    | 'not_supported_error' // 不支持错误：浏览器不支持该功能
    | 'unknown_error';      // 未知错误：其他未分类错误

/**
 * 播放错误信息
 * @description 详细的错误信息对象，包含错误类型和上下文
 */
export interface PlaybackError {
    type: PlaybackErrorType;    // 错误类型分类
    message: string;            // 错误描述信息
    code?: string | number;     // 错误代码（平台特定）
    details?: unknown;          // 详细错误信息（调试用）
    timestamp: number;          // 错误发生时间戳
    recoverable: boolean;       // 是否可恢复（自动重试）
    retryCount?: number;        // 已重试次数
}

// ==================== 音频技术信息 ====================

/**
 * 音频质量等级
 * @description 标识音频文件的音质水平
 */
export type QualityLevel =
    | 'low'         // 低质量：64kbps，节省流量
    | 'medium'      // 中等质量：128kbps，平衡选择
    | 'high'        // 高质量：320kbps，最佳体验
    | 'lossless';   // 无损质量：1411kbps，原始音质

/**
 * 音频文件格式
 * @description 支持的音频文件格式类型
 */
export type AudioFormat =
    | 'mp3'     // MP3格式：广泛兼容，有损压缩
    | 'flac'    // FLAC格式：无损压缩，高保真
    | 'wav'     // WAV格式：无损格式，文件较大
    | 'aac'     // AAC格式：高效有损压缩
    | 'ogg'     // OGG格式：开源格式，较好压缩
    | 'webm';   // WebM格式：网络优化格式

/**
 * 音频技术信息
 * @description 音频文件的详细技术参数和元数据
 */
export interface AudioInfo {
    duration: number;           // 时长（毫秒）：音频总长度
    bitrate: number;            // 比特率（kbps）：音频数据速率
    sampleRate: number;         // 采样率（Hz）：每秒采样次数
    channels: number;           // 声道数：单声道(1)或立体声(2)
    format: AudioFormat;        // 音频格式：文件编码格式
    codec: string;              // 编码格式：具体的编码器
    fileSize?: number;          // 文件大小（字节）：音频文件体积
}

/**
 * 音频统计信息
 * @description 音频播放过程中的实时统计数据和状态
 */
export interface AudioStats {
    currentTime: number;        // 当前播放时间：已播放时长（秒）
    duration: number;           // 总时长：音频总长度（秒）
    buffered: number;           // 缓冲进度：0-1，已缓冲的比例
    playbackRate: number;       // 播放速度：1.0为正常速度
    volume: number;             // 音量：0.0（静音）到 1.0（最大）
    muted: boolean;             // 是否静音：音量是否为0
    playbackQuality: QualityLevel; // 播放质量：当前播放的音质等级
    networkState: number;       // 网络状态：HTMLMediaElement网络状态
    readyState: number;         // 准备状态：HTMLMediaElement准备状态
}

// ==================== 音频状态 ====================

/**
 * 音频播放状态
 * @description 音频播放器的完整状态管理对象
 */
export interface AudioPlaybackState {
    // 播放状态
    isPlaying: boolean;         // 是否正在播放
    isPaused: boolean;          // 是否已暂停
    isStopped: boolean;         // 是否已停止
    isSeeking: boolean;         // 是否正在跳转

    // 时间状态
    currentTime: number;        // 当前播放时间（秒）
    duration: number;           // 音频总时长（秒）
    buffered: number;           // 缓冲进度 0.0-1.0
    playbackRate: number;       // 播放速度倍数

    // 音量状态
    volume: number;             // 音量大小 0.0-1.0
    isMuted: boolean;           // 是否静音

    // 加载状态
    loadState: AudioLoadState;  // 当前加载状态
    error: PlaybackError | null; // 错误信息（如果有）

    // 质量状态
    quality: QualityLevel;      // 音频质量等级
    bitrate: number;            // 当前比特率

    // 源信息
    source?: AudioSource;       // 音频源数据
    sourceType?: AudioSourceType; // 音频源类型
}

// ==================== 音频事件 ====================

/**
 * 音频事件映射
 * @description 音频元素可能触发的所有事件及其数据类型
 */
export interface AudioEventMap {
    'loadstart': { src: string };                       // 开始加载音频
    'loadedmetadata': AudioInfo;                        // 元数据加载完成
    'canplay': { readyState: number };                  // 可以开始播放
    'play': void;                                       // 开始播放
    'pause': void;                                      // 暂停播放
    'ended': { currentTime: number };                   // 播放结束
    'timeupdate': { currentTime: number, duration: number }; // 播放时间更新
    'volumechange': { volume: number, muted: boolean }; // 音量改变
    'error': PlaybackError;                             // 发生错误
    'waiting': void;                                    // 等待数据加载
    'playing': void;                                    // 开始播放（等待后）
    'seeked': { seekTime: number };                     // 跳转完成
    'buffering': { isBuffering: boolean };              // 缓冲状态改变
    'qualitychange': { quality: QualityLevel };         // 音质改变
}

/**
 * 音频事件类型
 * @description 所有支持的音频事件名称
 */
export type AudioEvent = keyof AudioEventMap;

// ==================== 音频配置 ====================

/**
 * 音频配置选项
 * @description 音频播放器的初始化和行为配置
 */
export interface AudioConfig {
    autoPlay?: boolean;                 // 是否自动开始播放
    preload?:                           // 预加载策略
        | 'none'        // 不预加载
        | 'metadata'    // 仅加载元数据
        | 'auto';       // 自动加载完整音频
    crossOrigin?:                       // 跨域设置
        | 'anonymous'           // 匿名跨域
        | 'use-credentials';    // 使用凭证跨域
    volume?: number;                    // 初始音量 0.0-1.0
    playbackRate?: number;              // 初始播放速度
    muted?: boolean;                    // 初始静音状态
    quality?: QualityLevel;             // 首选音质等级
}

// ==================== 常量定义 ====================

/**
 * 默认音频配置
 * @description 音频播放器的默认配置参数
 */
export const DEFAULT_AUDIO_CONFIG: AudioConfig = {
    autoPlay: false,                    // 不自动播放（浏览器策略）
    preload: 'metadata',                // 预加载元数据
    crossOrigin: 'anonymous',           // 匿名跨域请求
    volume: 0.8,                        // 80% 音量
    playbackRate: 1.0,                  // 正常速度
    muted: false,                       // 非静音状态
    quality: 'high'                     // 高质量优先
} as const;

/**
 * 质量等级对应的比特率
 * @description 各音质等级对应的典型比特率值（kbps）
 */
export const QUALITY_BITRATE: Record<QualityLevel, number> = {
    low: 64,        // 64 kbps - 低质量
    medium: 128,    // 128 kbps - 中等质量
    high: 320,      // 320 kbps - 高质量
    lossless: 1411  // 1411 kbps - CD音质无损
} as const;

/**
 * 支持的音频格式列表
 * @description 系统支持的所有音频文件格式
 */
export const SUPPORTED_FORMATS: AudioFormat[] = [
    'mp3', 'flac', 'wav', 'aac', 'ogg', 'webm'
];

/**
 * 默认播放模式
 * @description 播放器的初始播放模式
 */
export const DEFAULT_PLAYBACK_MODE: PlaybackMode = 'sequential';