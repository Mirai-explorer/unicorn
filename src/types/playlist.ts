// types/playlist.ts
// DONE: 实现播放列表设计 - 2025/11/21
import { PlaybackMode, AudioSourceType } from "@/types/audio";

/**
 * 播放列表相关类型定义
 *
 * 负责管理音乐播放列表的核心数据结构和业务逻辑
 * 包含曲目管理、播放队列、历史记录和导入导出等功能
 */

/* Last Update: 2025/11/21 7:35
 * -- MusicTrack接口 --
 * 音乐轨道的基础数据模型，包含完整的音频信息和元数据
 */

export interface MusicTrack {
    // === 基础标识信息 ===
    id: string;                     // 唯一标识符，用于曲目识别和管理
    title: string;                  // 歌曲标题，主要显示名称
    subtitle: string;               // 副标题/描述，补充信息或专辑名称
    artist: string;                 // 艺术家，表演者或创作者
    cover: string;                  // 封面图片URL，专辑或单曲封面
    audioUrl: string;               // 音频文件URL，实际的播放地址

    // === 技术元数据 ===
    duration: number;               // 时长（毫秒），音频总长度
    fileSize?: number;              // 文件大小（字节），音频文件体积
    bitrate?: number;               // 比特率（kbps），音频质量指标
    format?: string;                // 音频格式 'mp3' | 'flac' | 'wav' | 'aac'
    sampleRate?: number;            // 采样率（Hz），音频采样频率
    channels?: number;              // 声道数，单声道或立体声

    // === 系统标识 ===
    hash: string;                   // 文件哈希值，用于去重和完整性校验
    uniqueIndex: number;            // 唯一索引，在播放列表中的位置标识
    lastUpdated: number;            // 最后更新时间戳，用于同步和缓存

    // === 内容信息 ===
    lyrics?: string;                // 歌词内容，LRC格式的歌词文本
    albumId?: string;               // 专辑ID，所属专辑的唯一标识
    audioId?: string;               // 音频ID，平台特定的音频标识
    source?: AudioSourceType;       // 数据来源，标识音频的来源平台

    // === 分类信息 ===
    genre?: string;                 // 音乐类型，如流行、摇滚、古典等
    year?: number;                  // 发行年份，音乐发布的时间
    language?: string;              // 语言，歌词或歌曲的主要语言
    bpm?: number;                   // BPM（节奏），每分钟节拍数

    // === 用户数据 ===
    playCount?: number;             // 播放次数，用户播放统计
    lastPlayed?: number;            // 最后播放时间戳，最近播放时间
    rating?: number;                // 评分 1-5，用户对歌曲的评价
    favorite?: boolean;             // 是否收藏，用户标记的喜爱曲目
    tags?: string[];                // 用户标签，自定义分类标签
    comment?: string;               // 用户评论，个人笔记或感想
}

/* Last Update: 2025/11/21 7:46
 * -- 播放列表系统扩展 --
 * 播放列表的状态管理和业务逻辑类型
 */

/**
 * 播放列表状态
 * @description 播放器的核心状态管理，包含当前播放、队列和历史等信息
 */
export interface PlaylistState {
    tracks: MusicTrack[];           // 播放列表中的曲目集合
    currentTrackIndex: number;      // 当前播放曲目的索引位置
    playbackMode: PlaybackMode;     // 播放模式（顺序、随机、循环等）
    isLoading: boolean;             // 加载状态，是否正在加载数据
    error?: string;                 // 错误信息，播放过程中的错误描述

    // 扩展状态
    history: PlaylistHistory[];     // 播放历史记录
    queue: QueueItem[];             // 播放队列，待播放曲目列表
    shuffleOrder: number[];         // 随机播放顺序，维护随机序列
    filters: PlaylistFilters;       // 筛选条件，曲目过滤设置
    stats: PlaylistStats;           // 统计信息，播放列表数据分析
}

/**
 * 播放历史记录
 * @description 记录用户的播放行为，用于分析和回放
 */
export interface PlaylistHistory {
    track: MusicTrack;              // 播放的曲目信息
    playedAt: number;               // 播放时间戳
    position: number;               // 在播放列表中的原始位置
    duration?: number;              // 实际播放时长（毫秒）
    completed?: boolean;            // 是否完整播放到结束
    skipped?: boolean;              // 是否被用户跳过
    endedReason?:                  // 播放结束原因
        | 'completed'   // 正常播放完成
        | 'skipped'     // 用户手动跳过
        | 'error';      // 播放错误中断
}

/**
 * 播放队列项
 * @description 播放队列中的单个项目，支持优先级和上下文
 */
export interface QueueItem {
    track: MusicTrack;              // 队列中的曲目
    addedAt: number;                // 添加到队列的时间戳
    addedBy:                        // 添加来源
        | 'user'    // 用户手动添加
        | 'auto'    // 系统自动添加（如推荐）
        | 'system'; // 系统功能添加（如播放列表）
    priority?: number;              // 优先级 1-10，数字越大优先级越高
    context?: string;               // 添加上下文（如：推荐、收藏、搜索等）
}

/**
 * 播放列表操作结果
 * @description 播放列表操作的统一返回格式，支持泛型数据
 */
export interface PlaylistOperationResult<T = unknown> {
    success: boolean;               // 操作是否成功
    action: string;                 // 操作类型标识
    affectedTracks: number;         // 影响的曲目数量
    message?: string;               // 操作结果描述
    data?: T;                       // 操作返回的附加数据
    timestamp: number;              // 操作时间戳
    errorCode?: string;             // 错误代码，具体的错误标识
}

/**
 * 播放列表错误代码
 * @description 系统预定义的播放列表操作错误类型
 */
export type PlaylistErrorCode =
    | 'TRACK_NOT_FOUND'         // 曲目不存在
    | 'INDEX_OUT_OF_RANGE'      // 索引超出范围
    | 'DUPLICATE_TRACK'         // 重复曲目
    | 'INVALID_TRACK_DATA'      // 曲目数据无效
    | 'PLAYLIST_EMPTY'          // 播放列表为空
    | 'QUEUE_EMPTY';            // 播放队列为空

/**
 * 播放列表筛选条件
 * @description 用于过滤和搜索播放列表中的曲目
 */
export interface PlaylistFilters {
    searchQuery?: string;           // 搜索关键词，模糊匹配标题和艺术家
    artists?: string[];             // 艺术家筛选，指定艺术家列表
    genres?: string[];              // 音乐类型筛选，指定类型列表
    minRating?: number;             // 最低评分，筛选评分高于该值的曲目
    favoriteOnly?: boolean;         // 仅收藏，只显示用户收藏的曲目
    durationRange?: [number, number]; // 时长范围（毫秒），筛选指定时长的曲目
    yearRange?: [number, number];   // 年份范围，筛选指定年份的曲目
}

/* Last Update: 2025/11/21 7:29
 * -- 播放列表数据模型 --
 * 播放列表的导入导出和数据持久化类型
 */

/**
 * 播放列表导出格式
 * @description 播放列表的标准化导出数据结构，支持跨平台迁移
 */
export interface PlaylistExport {
    // 元数据
    version: string;                // 数据格式版本 "1.0.0"
    exportDate: string;             // ISO 8601 日期，导出时间
    name?: string;                  // 播放列表名称，用户定义的名称
    description?: string;           // 播放列表描述，详细说明
    cover?: string;                 // 播放列表封面，代表性图片
    tags?: string[];                // 标签分类，用于组织和搜索

    // 核心数据
    tracks: MusicTrack[];           // 曲目列表，播放列表的主要内容

    // 统计信息
    stats: PlaylistStats;           // 统计信息，播放列表的数据分析

    // 扩展信息
    metadata?: PlaylistMetadata;    // 元数据，额外的配置和信息
}

/**
 * 播放列表统计信息
 * @description 播放列表的数据统计和分析结果
 */
export interface PlaylistStats {
    totalTracks: number;            // 总曲目数，播放列表中的曲目数量
    totalDuration: number;          // 总时长（毫秒），所有曲目的总时长
    totalSize?: number;             // 总大小（字节），所有音频文件的总大小
    genres: string[];               // 包含的音乐类型，去重后的类型列表
    artists: string[];              // 包含的艺术家，去重后的艺术家列表
    createdDate?: string;           // 创建日期，播放列表创建时间
    lastModified?: string;          // 最后修改日期，最后更新时间
    playCount?: number;             // 播放次数，该播放列表的总播放次数
}

/**
 * 播放列表元数据
 * @description 播放列表的附加信息和配置
 */
export interface PlaylistMetadata {
    source?:                        // 数据来源
        | 'local'       // 本地创建
        | 'cloud'       // 云端同步
        | 'imported';   // 从其他平台导入
    syncInfo?: SyncInfo;            // 同步信息，云端同步相关配置
    sharing?: SharingInfo;          // 分享信息，播放列表分享设置
    backup?: BackupInfo;            // 备份信息，数据备份相关
}

/**
 * 同步信息
 * @description 播放列表的云端同步配置和状态
 */
export interface SyncInfo {
    syncId?: string;                // 同步ID，云端同步的唯一标识
    lastSync?: string;              // 最后同步时间，最后一次同步的时间
    cloudProvider?:                 // 云提供商
        | 'google'      // Google Drive
        | 'dropbox'     // Dropbox
        | 'onedrive';   // OneDrive
}

/**
 * 分享信息
 * @description 播放列表的分享设置和访问控制
 */
export interface SharingInfo {
    isPublic: boolean;              // 是否公开，是否允许公开访问
    shareUrl?: string;              // 分享链接，公开访问的URL
    password?: string;              // 访问密码，私有分享的密码
    expiresAt?: string;             // 过期时间，分享链接的有效期
}

/**
 * 备份信息
 * @description 播放列表的数据备份记录和校验
 */
export interface BackupInfo {
    backupId: string;               // 备份ID，备份记录的唯一标识
    backupDate: string;             // 备份时间，备份创建的时间
    checksum: string;               // 数据校验和，用于验证数据完整性
}

/* Last Update: 2025/11/21 7:54
 * -- 播放列表扩展设计 --
 * 实用工具类型和常量定义
 */

// 实用类型
export type TrackId = string;       // 曲目ID类型，强化类型安全
export type PlaylistId = string;    // 播放列表ID类型，强化类型安全

/**
 * 播放列表操作类型
 * @description 系统支持的所有播放列表操作类型
 */
export type PlaylistAction =
    | 'add_track'           // 添加曲目
    | 'remove_track'        // 移除曲目
    | 'move_track'          // 移动曲目
    | 'set_current_track'   // 设置当前播放曲目
    | 'play_next'           // 播放下一首
    | 'play_previous'       // 播放上一首
    | 'set_playback_mode'   // 设置播放模式
    | 'add_to_queue'        // 添加到队列
    | 'clear_history';      // 清空历史记录

/**
 * 简化的播放列表信息
 * @description 用于列表展示的轻量级播放列表信息
 */
export interface PlaylistInfo {
    id: PlaylistId;                 // 播放列表ID
    name: string;                   // 播放列表名称
    description?: string;           // 播放列表描述
    cover?: string;                 // 播放列表封面
    trackCount: number;             // 曲目数量
    totalDuration: number;          // 总时长（毫秒）
    lastPlayed?: number;            // 最后播放时间
    createdAt: number;              // 创建时间
}

// ==================== 常量定义 ====================

/**
 * 默认播放列表名称
 * @description 创建新播放列表时的默认名称
 */
export const DEFAULT_PLAYLIST_NAME = '默认播放列表';

/**
 * 最大队列大小
 * @description 播放队列的最大容量限制
 */
export const MAX_QUEUE_SIZE = 100;

/**
 * 最大历史记录数量
 * @description 播放历史记录的最大保存数量
 */
export const MAX_HISTORY_SIZE = 1000;

/**
 * 队列优先级常量
 * @description 播放队列项的标准优先级定义
 */
export const QUEUE_PRIORITY = {
    LOW: 1,         // 低优先级：系统推荐或自动添加
    NORMAL: 5,      // 普通优先级：用户手动添加
    HIGH: 10,       // 高优先级：用户特别指定
    URGENT: 15      // 紧急优先级：立即播放的需求
} as const;