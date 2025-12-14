// hooks/useKeyboardShortcuts.ts
/**
 * 键盘快捷键 Hook
 */
import { useEffect } from 'react';

export const useKeyboardShortcuts = (handlers: {
    playPause?: () => void;
    nextTrack?: () => void;
    previousTrack?: () => void;
    volumeUp?: () => void;
    volumeDown?: () => void;
    toggleMute?: () => void;
    toggleLyrics?: () => void;
    togglePlaylist?: () => void;
}) => {
    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            // 防止在输入框中触发快捷键
            if (event.target instanceof HTMLInputElement ||
                event.target instanceof HTMLTextAreaElement) {
                return;
            }

            const { key, ctrlKey, metaKey, shiftKey, altKey } = event;

            // 空格键 - 播放/暂停
            if (key === ' ' && !ctrlKey && !metaKey) {
                event.preventDefault();
                handlers.playPause?.();
            }

            // 方向键控制
            else if (key === 'ArrowRight' && !shiftKey) {
                event.preventDefault();
                handlers.nextTrack?.();
            }
            else if (key === 'ArrowLeft' && !shiftKey) {
                event.preventDefault();
                handlers.previousTrack?.();
            }
            else if (key === 'ArrowUp') {
                event.preventDefault();
                handlers.volumeUp?.();
            }
            else if (key === 'ArrowDown') {
                event.preventDefault();
                handlers.volumeDown?.();
            }

            // 功能快捷键
            else if (key === 'm' || key === 'M') {
                event.preventDefault();
                handlers.toggleMute?.();
            }
            else if (key === 'l' || key === 'L') {
                if (ctrlKey || metaKey) {
                    event.preventDefault();
                    handlers.toggleLyrics?.();
                }
            }
            else if (key === 'p' || key === 'P') {
                if (ctrlKey || metaKey) {
                    event.preventDefault();
                    handlers.togglePlaylist?.();
                }
            }
        };

        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [handlers]);
};