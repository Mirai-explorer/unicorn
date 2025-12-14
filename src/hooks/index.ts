// hooks/index.ts
/**
 * 播放器自定义 Hooks 统一导出入口
 * 提供完整的状态管理和业务逻辑封装
 */

// 核心功能 Hooks
export { useAudioPlayback } from './useAudioPlayback';
export { usePlaylistManager } from './usePlaylistManager';
export { usePlayerUI } from './usePlayerUI';
export { usePlayerSettings } from './usePlayerSettings';
export { useLyricsManager2 } from './useLyricsManager2';

// 工具 Hooks
export { useMediaSession2 } from './useMediaSession2';
export { useKeyboardShortcuts } from './useKeyboardShortcuts';
export { useLocalStorage } from './useLocalStorage';

// 组合 Hooks
export { usePlayer } from './usePlayer';

// 类型重导出（方便使用）


/**
 * 使用示例：
 *
 * // 方式1：分别导入需要的 Hook
 * import { useAudioPlayback, usePlaylistManager } from '@/hooks';
 *
 * // 方式2：使用聚合 Hook
 * import { usePlayer } from '@/hooks';
 *
 * const Component = () => {
 *   // 方式1：分别使用
 *   const audio = useAudioPlayback();
 *   const playlist = usePlaylistManager();
 *
 *   // 方式2：使用聚合
 *   const { audio, playlist, ui, settings } = usePlayer();
 *
 *   return <div>...</div>;
 * };
 */