// contexts/index.ts
/**
 * Contexts 统一导出入口
 */

export { PlayerProvider, usePlayer } from './PlayerContext2';
export { ThemeProvider, useTheme } from './ThemeContext2';
export { ToastProvider, useToast } from './ToastContext2';
export { SettingsProvider, useSettings, settingsPresets } from './SettingsContext';

// 组合 Provider（用于在 App 中一次性提供所有 Context）
export { AppProviders2 } from './AppProviders2';