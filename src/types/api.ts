// types/api.ts
import { AudioSourceKugou, AudioSourceNetease, QualityLevel } from "@/types/audio";

/**
 * API 响应和请求相关类型定义
 *
 * 负责定义与后端服务通信的数据结构和接口规范
 * 包含统一的响应格式、错误处理和业务数据类型
 */

// ==================== 基础响应类型 ====================

/**
 * 基础 API 响应格式
 * @description 所有 API 响应的统一数据结构
 */
export interface ApiResponse<T = unknown> {
    success: boolean;           // 请求是否成功
    data: T;                    // 响应数据主体
    error?: string;             // 错误信息（失败时）
    err_code?: number;          // 错误代码（失败时）
    message?: string;           // 成功或失败的描述信息
    timestamp: number;          // 响应时间戳
    requestId?: string;         // 请求唯一标识，用于追踪
}

/**
 * 分页 API 响应格式
 * @description 支持分页查询的列表数据响应
 */
export interface PaginatedResponse<T = unknown> extends ApiResponse<T[]> {
    pagination: {
        page: number;           // 当前页码（从1开始）
        pageSize: number;       // 每页数据量
        total: number;          // 数据总数
        totalPages: number;     // 总页数
        hasNext: boolean;       // 是否有下一页
        hasPrev: boolean;       // 是否有上一页
    };
    // 可选的排序和筛选信息
    sort?: {
        field: string;          // 排序字段
        order: 'asc' | 'desc';  // 排序方向
    };
    filters?: Record<string, unknown>; // 当前应用的筛选条件
}

// ==================== 业务数据响应 ====================

/**
 * 音乐源数据响应
 * @description 从不同音乐平台获取音频源数据的响应格式
 */
export interface MusicSourceResponse {
    success: boolean;                   // 获取是否成功
    data: AudioSourceKugou | AudioSourceNetease; // 音频源数据
    error?: string;                     // 错误信息
    source: 'kugou' | 'netease';        // 数据来源平台
    cacheKey?: string;                  // 缓存键（如果使用了缓存）
    quality?: QualityLevel;             // 音频质量等级
    expiresAt?: number;                 // 数据过期时间戳
}

/**
 * 歌词 API 响应
 * @description 歌词获取服务的响应数据结构
 */
export interface LyricApiResponse {
    lyric: string;              // 原始歌词内容（LRC格式）
    tlyric?: string;            // 翻译歌词（Translated lyric）
    romal?: string;             // 罗马音歌词（Romanization lyric）
    code: number;               // 状态码（0表示成功）
    source: 'kugou' | 'netease'; // 歌词来源平台
    q: number;                  // 歌词质量评分（0-100）
    language?: string;          // 歌词语言
    offset?: number;            // 时间偏移量（毫秒）
    cache?: boolean;            // 是否来自缓存
}

// ==================== 搜索相关类型 ====================

/**
 * 搜索请求参数
 * @description 音乐搜索功能的查询参数
 */
export interface SearchParams {
    keyword: string;                    // 搜索关键词
    page?: number;                      // 页码（默认1）
    pageSize?: number;                  // 每页数量（默认20）
    source?:                            // 搜索源限制
        | 'all'         // 所有平台
        | 'kugou'       // 仅酷狗
        | 'netease';    // 仅网易云
    type?:                              // 搜索类型
        | 'track'       // 单曲搜索
        | 'album'       // 专辑搜索
        | 'artist'      // 艺术家搜索
        | 'playlist';   // 歌单搜索
    sort?:                              // 排序方式
        | 'default'     // 默认排序（相关性）
        | 'hot'         // 热度排序
        | 'new'         // 最新发布
        | 'duration';   // 时长排序
    quality?: QualityLevel;             // 音质筛选
    year?: number;                      // 年份筛选
    genre?: string;                     // 流派筛选
}

/**
 * 搜索结果项
 * @description 搜索返回的单条音乐记录
 */
export interface SearchResultItem {
    id: string;                 // 曲目唯一标识
    title: string;              // 歌曲标题
    artist: string;             // 艺术家名称
    album: string;              // 专辑名称
    cover: string;              // 封面图片URL
    duration: number;           // 时长（毫秒）
    source: 'kugou' | 'netease'; // 数据来源平台
    audioUrl?: string;          // 音频文件URL（可能为空）
    quality: QualityLevel;      // 音质等级
    bitrate?: number;           // 比特率（kbps）
    fileSize?: number;          // 文件大小（字节）
    publishTime?: number;       // 发布时间戳
    genre?: string;             // 音乐流派
    lyrics?: boolean;           // 是否有歌词
    playCount?: number;         // 播放次数
}

/**
 * 搜索响应
 * @description 搜索请求的完整响应数据
 */
export interface SearchResponse extends PaginatedResponse<SearchResultItem> {
    query: string;              // 原始搜索关键词
    source: string;             // 实际使用的搜索源
    searchTime: number;         // 搜索耗时（毫秒）
    suggestions?: string[];     // 搜索建议关键词
    related?: string[];         // 相关搜索词
}

// ==================== 错误处理 ====================

/**
 * 错误响应格式
 * @description 标准化的错误信息结构
 */
export interface ErrorResponse {
    code: number;               // 错误代码
    message: string;            // 错误描述
    details?: unknown;          // 详细错误信息
    timestamp: number;          // 错误发生时间
    requestId?: string;         // 请求ID（用于问题追踪）
    stack?: string;             // 错误堆栈（开发环境）
    suggestions?: string[];     // 解决建议
}

/**
 * API 错误代码枚举
 * @description 系统预定义的错误代码
 */
export type ApiErrorCode =
    | 'NETWORK_ERROR'           // 网络连接错误
    | 'TIMEOUT_ERROR'           // 请求超时
    | 'PARSE_ERROR'             // 数据解析错误
    | 'VALIDATION_ERROR'        // 参数验证失败
    | 'AUTH_ERROR'              // 认证失败
    | 'RATE_LIMIT_ERROR'        // 频率限制
    | 'SERVER_ERROR'            // 服务器错误
    | 'NOT_FOUND_ERROR'         // 资源未找到
    | 'UNKNOWN_ERROR';          // 未知错误

// ==================== 请求配置 ====================

/**
 * 请求配置选项
 * @description HTTP 请求的高级配置参数
 */
export interface RequestConfig {
    timeout?: number;           // 请求超时时间（毫秒）
    retry?: number;             // 重试次数（默认0）
    retryDelay?: number;        // 重试延迟（毫秒）
    cache?: boolean;            // 是否启用缓存
    cacheTTL?: number;          // 缓存存活时间（秒）
    headers?: Record<string, string>; // 自定义请求头
    credentials?: 'include' | 'same-origin' | 'omit'; // 凭证模式
    mode?: 'cors' | 'no-cors' | 'same-origin'; // 请求模式
    signal?: AbortSignal;       // 取消请求的信号
}

/**
 * 上传进度信息
 * @description 文件上传过程中的进度追踪
 */
export interface UploadProgress {
    loaded: number;             // 已上传字节数
    total: number;              // 总字节数
    percent: number;            // 上传百分比 0-100
    speed: number;              // 上传速度（字节/秒）
    timeRemaining: number;      // 预计剩余时间（秒）
}

// ==================== 其他业务类型 ====================

/**
 * 批量操作响应
 * @description 批量请求的响应格式
 */
export interface BatchResponse<T = unknown> {
    results: Array<{
        id: string;             // 操作项ID
        success: boolean;       // 是否成功
        data?: T;               // 成功时的数据
        error?: string;         // 失败时的错误
    }>;
    total: number;              // 总操作数
    success: number;            // 成功数
    failed: number;             // 失败数
}

/**
 * 健康检查响应
 * @description 服务健康状态检查
 */
export interface HealthCheckResponse {
    status: 'healthy' | 'degraded' | 'unhealthy';
    timestamp: number;
    version: string;
    services: Record<string, {
        status: 'up' | 'down';
        latency?: number;
        message?: string;
    }>;
}

// ==================== 常量定义 ====================

/**
 * 默认请求配置
 * @description 全局默认的请求参数
 */
export const DEFAULT_REQUEST_CONFIG: RequestConfig = {
    timeout: 10000,             // 10秒超时
    retry: 2,                   // 重试2次
    retryDelay: 1000,           // 1秒重试间隔
    cache: true,                // 启用缓存
    cacheTTL: 300,              // 5分钟缓存
    headers: {
        'Content-Type': 'application/json'
    }
} as const;

/**
 * API 错误代码映射
 * @description 错误代码对应的HTTP状态码
 */
export const ERROR_CODE_MAP: Record<ApiErrorCode, number> = {
    NETWORK_ERROR: 0,           // 网络错误（非HTTP错误）
    TIMEOUT_ERROR: 408,         // 请求超时
    PARSE_ERROR: 400,           // 数据解析错误
    VALIDATION_ERROR: 422,      // 参数验证失败
    AUTH_ERROR: 401,            // 认证失败
    RATE_LIMIT_ERROR: 429,      // 频率限制
    SERVER_ERROR: 500,          // 服务器错误
    NOT_FOUND_ERROR: 404,       // 资源未找到
    UNKNOWN_ERROR: 500          // 未知错误
} as const;

/**
 * 支持的音频源平台
 * @description 系统支持的音乐数据源
 */
export const SUPPORTED_SOURCES = ['kugou', 'netease'] as const;
export type SupportedSource = typeof SUPPORTED_SOURCES[number];

/**
 * 搜索类型选项
 * @description 可用的搜索内容类型
 */
export const SEARCH_TYPES = ['track', 'album', 'artist', 'playlist'] as const;
export type SearchType = typeof SEARCH_TYPES[number];