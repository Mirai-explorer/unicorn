// types/index.ts
/**
 * 播放器类型定义统一导出入口
 *
 * 提供所有类型定义的一站式导入，简化模块间的类型引用
 * 采用分层导出策略，支持按需导入和批量导入两种方式
 */

// ==================== 核心业务类型 ====================

/**
 * 音频播放相关类型
 * @description 音频处理、播放控制、质量设置等核心类型
 */
export * from './audio';

/**
 * 播放列表管理类型
 * @description 曲目管理、播放队列、历史记录等播放列表功能
 */
export * from './playlist';

/**
 * 用户界面相关类型
 * @description 布局、主题、交互、响应式等UI相关类型
 */
export * from './ui';

/**
 * 播放器设置类型
 * @description 用户配置、预设、个性化设置等类型
 */
export * from './settings';

/**
 * 歌词系统类型
 * @description 歌词解析、显示、同步等多语言歌词功能
 */
export * from './lyrics';

/**
 * API 通信类型
 * @description 网络请求、响应格式、错误处理等API相关类型
 */
export * from './api';

// ==================== 工具类型 ====================

/**
 * 通用工具类型
 * @description TypeScript 高级类型工具和通用数据结构
 */
export * from './utils';

// ==================== 常用类型快捷导出（可选） ====================

// 这些快捷导出是可选的，因为上面已经批量导出了
// 但它们可以提供更好的开发体验和自动补全

/**
 * 音乐轨道类型
 * @description 最常用的曲目数据结构
 */
export type { MusicTrack } from './playlist';

/**
 * 播放器布局类型
 * @description 界面布局相关的类型定义
 */
export type { PlayerLayout, CoverSize, ThemeMode } from './ui';

/**
 * 播放模式类型
 * @description 音频播放行为控制类型
 */
export type { PlaybackMode, QualityLevel } from './audio';

/**
 * 歌词语言类型
 * @description 多语言歌词显示控制类型
 */
export type { LyricLanguage, LyricDisplayMode } from './lyrics';