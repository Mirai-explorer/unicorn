// types/ui.ts
/**
 * 用户界面相关类型定义
 *
 * 负责管理播放器的视觉表现、交互状态和用户体验配置
 */

// ==================== 布局与外观 ====================

/**
 * 播放器布局模式
 * @description 定义播放器整体的视觉布局方式
 */
export type PlayerLayout =
    | 'classic'     // 经典布局：封面+歌词+控制栏的传统布局
    | 'compact'     // 紧凑布局：最小化空间占用，适合多任务场景
    | 'minimal'     // 极简布局：仅显示必要控件，专注音频内容
    | 'theater'     // 剧场模式：大封面+全屏歌词，沉浸式体验
    | 'fullscreen'  // 全屏模式：占用整个屏幕，无干扰播放
    | 'pc';         // PC布局：左侧封面，右侧歌曲信息和歌词，适合桌面设备

/**
 * 封面图片尺寸
 * @description 控制专辑封面在界面中的显示大小
 */
export type CoverSize =
    | 'small'       // 小尺寸：64x64px，适合紧凑布局
    | 'default'     // 默认尺寸：128x128px，平衡显示效果
    | 'large'       // 大尺寸：256x256px，突出封面艺术
    | 'xlarge';     // 超大尺寸：512x512px，剧场模式专用

/**
 * 主题色彩模式
 * @description 定义播放器的整体色彩方案
 */
export type ThemeMode =
    | 'light'       // 浅色主题：明亮背景，深色文字
    | 'dark'        // 深色主题：深色背景，浅色文字
    | 'auto';       // 自动模式：跟随系统主题设置

/**
 * 动画效果模式
 * @description 控制界面动画的丰富程度，兼顾性能和体验
 */
export type AnimationMode =
    | 'full'        // 完整动画：所有过渡效果和微交互
    | 'reduced'     // 简化动画：仅保留必要的过渡效果
    | 'none';       // 无动画：禁用所有动画，最高性能

// ==================== 控件与交互 ====================

/**
 * 控制栏位置
 * @description 定义播放控制组件在界面中的位置
 */
export type ControlPosition =
    | 'bottom'      // 底部：传统播放器布局，易于操作
    | 'top'         // 顶部：类似音乐APP设计，单手操作友好
    | 'left'        // 左侧：垂直布局，适合宽屏设备
    | 'right'       // 右侧：垂直布局，与系统控件对齐
    | 'floating';   // 浮动：可拖拽的悬浮控件，灵活定位

/**
 * 模态框类型
 * @description 标识当前打开的模态对话框类型
 */
export type ModalType =
    | 'search'      // 搜索模态框：曲目搜索和筛选
    | 'settings'    // 设置模态框：播放器配置选项
    | 'playlist'    // 播放列表面板：列表管理和队列操作
    | 'lyrics'      // 歌词面板：全屏歌词显示和编辑
    | 'equalizer'   // 均衡器：音频效果调节
    | 'info'        // 信息面板：曲目详细信息
    | 'none';       // 无模态框：所有模态框关闭

/**
 * 通知消息类型
 * @description 定义用户反馈消息的类别和样式
 */
export type ToastType =
    | 'info'        // 信息通知：一般性操作反馈
    | 'success'     // 成功通知：操作成功完成
    | 'warning'     // 警告通知：需要注意的操作提示
    | 'error';      // 错误通知：操作失败或异常情况

// ==================== 通知系统 ====================

/**
 * 通知消息数据
 * @description 完整的通知消息数据结构，支持交互操作
 */
export interface ToastMessage {
    id: string;                     // 唯一标识符，用于消息管理
    message: string;                // 通知内容文本
    type: ToastType;                // 通知类型，决定样式和图标
    duration?: number;              // 显示时长(毫秒)，默认3000ms
    timestamp: number;              // 创建时间戳，用于排序和过期
    action?: {                      // 可选操作按钮
        label: string;              // 操作按钮文本
        onClick: () => void;        // 点击回调函数
    };
}

/**
 * 工具提示数据
 * @description 浮动提示框的显示数据和定位信息
 */
export interface TooltipData {
    id: string;                     // 工具提示唯一标识
    content: string;                // 提示内容文本
    x: number;                      // 屏幕X坐标位置
    y: number;                      // 屏幕Y坐标位置
    placement?:                     // 提示框相对位置
        | 'top'     // 上方显示
        | 'bottom'  // 下方显示
        | 'left'    // 左侧显示
        | 'right';  // 右侧显示
    visible: boolean;               // 是否可见状态
}

// ==================== 加载状态 ====================

/**
 * 加载状态信息
 * @description 统一管理各种加载场景的进度和状态
 */
export interface LoadingState {
    isLoading: boolean;             // 是否处于加载中状态
    progress: number;               // 加载进度 0-100
    message?: string;               // 加载状态描述文本
    indeterminate?: boolean;        // 是否为不确定进度（循环动画）
}

// ==================== 响应式设计 ====================

/**
 * 响应式断点
 * @description 基于屏幕宽度的布局断点定义
 */
export type Breakpoint =
    | 'xs'  // 超小屏幕：< 576px (手机竖屏)
    | 'sm'  // 小屏幕：≥ 576px (手机横屏)
    | 'md'  // 中等屏幕：≥ 768px (平板设备)
    | 'lg'  // 大屏幕：≥ 992px (小型笔记本)
    | 'xl'; // 超大屏幕：≥ 1200px (桌面设备)

/**
 * 窗口尺寸信息
 * @description 当前浏览器窗口的尺寸和响应式状态
 */
export interface WindowSize {
    width: number;                  // 窗口宽度(像素)
    height: number;                 // 窗口高度(像素)
    breakpoint: Breakpoint;         // 当前激活的响应式断点
}

// ==================== 交互状态 ====================

/**
 * 用户交互状态
 * @description 跟踪用户在播放器中的实时交互行为
 */
export interface InteractionState {
    isHovering: boolean;            // 是否有元素处于悬停状态
    isDragging: boolean;            // 是否正在进行拖拽操作
    isSeeking: boolean;             // 是否正在调整播放进度
    activeControl: string | null;   // 当前激活的控件标识
    lastInteraction: number;        // 最后交互时间戳(用于超时处理)
}

// ==================== UI 配置 ====================

/**
 * 用户界面配置
 * @description 所有可自定义的界面显示和行为设置
 */
export interface UIConfig {
    layout: PlayerLayout;           // 播放器整体布局模式
    coverSize: CoverSize;           // 专辑封面显示尺寸
    theme: ThemeMode;               // 色彩主题模式
    animations: AnimationMode;      // 动画效果级别
    controlPosition: ControlPosition; // 控制栏位置
    showSpectrum: boolean;          // 是否显示音频频谱
    showWaveform: boolean;          // 是否显示波形图
    highContrast: boolean;          // 高对比度模式(无障碍)
    reduceMotion: boolean;          // 减少动画模式(无障碍)
}

// ==================== 常量定义 ====================

/**
 * 默认UI配置
 * @description 播放器的默认界面设置
 */
export const DEFAULT_UI_CONFIG: UIConfig = {
    layout: 'classic',
    coverSize: 'default',
    theme: 'auto',
    animations: 'full',
    controlPosition: 'bottom',
    showSpectrum: false,
    showWaveform: true,
    highContrast: false,
    reduceMotion: false
} as const;

/**
 * 断点宽度映射
 * @description 响应式断点对应的最小宽度值
 */
export const BREAKPOINTS: Record<Breakpoint, number> = {
    xs: 0,      // 0 - 575px
    sm: 576,    // 576px - 767px
    md: 768,    // 768px - 991px
    lg: 992,    // 992px - 1199px
    xl: 1200    // ≥ 1200px
} as const;

/**
 * 通知默认持续时间
 * @description 不同类型通知的默认显示时长
 */
export const TOAST_DURATIONS: Record<ToastType, number> = {
    info: 3000,     // 3秒
    success: 2000,  // 2秒
    warning: 4000,  // 4秒
    error: 5000     // 5秒
} as const;