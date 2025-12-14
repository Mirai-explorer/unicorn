// hooks/usePlayerUI.ts
import {useState, useCallback, useRef, useEffect, useMemo} from 'react';

export const usePlayerUI = () => {
    // 🎯 模态框显示状态
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [isSettingsVisible, setIsSettingsVisible] = useState(false);
    const [isPlaylistVisible, setIsPlaylistVisible] = useState(false);
    const [isLyricsPanelVisible, setIsLyricsPanelVisible] = useState(false);
    const [isEqualizerVisible, setIsEqualizerVisible] = useState(false);

    // 🎯 播放器视觉状态
    const [isCoverRotating, setIsCoverRotating] = useState(false);
    const [coverRotationState, setCoverRotationState] = useState<'running' | 'paused'>('paused');
    const [isSeeking, setIsSeeking] = useState(false); // 原 reduce 状态

    // 🎯 交互状态
    const [isDragging, setIsDragging] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [activeControl, setActiveControl] = useState<string | null>(null);

    // 🎯 通知和反馈状态
    const [toastMessage, setToastMessage] = useState<{ message: string; type?: 'info' | 'success' | 'warning' | 'error'; timestamp: number }>({
        message: '',
        timestamp: 0
    });
    const [tooltip, setTooltip] = useState<{ content: string; x: number; y: number } | null>(null);

    // 🎯 响应式状态

    const isClient = typeof window !== 'undefined';

    const [windowSize, setWindowSize] = useState({
        width: isClient ? window.innerWidth : 0,
        height: isClient ? window.innerHeight : 0
    });

    const [isMobileView, setIsMobileView] = useState(isClient ? window.innerWidth < 768 : false);


    // 🎯 加载状态
    const [isLoading, setIsLoading] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(0);

    const hoverTimer = useRef<NodeJS.Timeout | null>(null);
    const tooltipTimer = useRef<NodeJS.Timeout | null>(null);

    // 🎯 搜索模态框控制
    const showSearch = useCallback(() => {
        setIsSearchVisible(true);
        // 关闭其他可能冲突的模态框
        setIsSettingsVisible(false);
        setIsPlaylistVisible(false);
    }, []);

    const hideSearch = useCallback(() => {
        setIsSearchVisible(false);
    }, []);

    const toggleSearch = useCallback(() => {
        setIsSearchVisible(prev => !prev);
    }, []);

    // 🎯 设置模态框控制
    const showSettings = useCallback(() => {
        setIsSettingsVisible(true);
        setIsSearchVisible(false);
        setIsPlaylistVisible(false);
    }, []);

    const hideSettings = useCallback(() => {
        setIsSettingsVisible(false);
    }, []);

    const toggleSettings = useCallback(() => {
        setIsSettingsVisible(prev => !prev);
    }, []);

    // 🎯 播放列表模态框控制
    const showPlaylist = useCallback(() => {
        setIsPlaylistVisible(true);
        setIsSearchVisible(false);
        setIsSettingsVisible(false);
    }, []);

    const hidePlaylist = useCallback(() => {
        setIsPlaylistVisible(false);
    }, []);

    const togglePlaylist = useCallback(() => {
        setIsPlaylistVisible(prev => !prev);
    }, []);

    // 🎯 歌词面板控制
    const showLyricsPanel = useCallback(() => {
        setIsLyricsPanelVisible(true);
    }, []);

    const hideLyricsPanel = useCallback(() => {
        setIsLyricsPanelVisible(false);
    }, []);

    const toggleLyricsPanel = useCallback(() => {
        setIsLyricsPanelVisible(prev => !prev);
    }, []);

    // 🎯 均衡器控制
    const showEqualizer = useCallback(() => {
        setIsEqualizerVisible(true);
    }, []);

    const hideEqualizer = useCallback(() => {
        setIsEqualizerVisible(false);
    }, []);

    const toggleEqualizer = useCallback(() => {
        setIsEqualizerVisible(prev => !prev);
    }, []);

    // 🎯 关闭所有模态框
    const closeAllModals = useCallback(() => {
        setIsSearchVisible(false);
        setIsSettingsVisible(false);
        setIsPlaylistVisible(false);
        setIsLyricsPanelVisible(false);
        setIsEqualizerVisible(false);
    }, []);

    // 🎯 封面旋转控制
    const startCoverRotation = useCallback(() => {
        setIsCoverRotating(true);
        setCoverRotationState('running');
    }, []);

    const stopCoverRotation = useCallback(() => {
        setIsCoverRotating(false);
        setCoverRotationState('paused');
    }, []);

    const toggleCoverRotation = useCallback(() => {
        setIsCoverRotating(prev => !prev);
        setCoverRotationState(prev => prev === 'running' ? 'paused' : 'running');
    }, []);

    // 🎯 拖动状态控制（原 reduce 状态）
    const startSeeking = useCallback(() => {
        setIsSeeking(true);
    }, []);

    const stopSeeking = useCallback(() => {
        setIsSeeking(false);
    }, []);

    // 🎯 拖动状态控制
    const startDragging = useCallback(() => {
        setIsDragging(true);
    }, []);

    const stopDragging = useCallback(() => {
        setIsDragging(false);
    }, []);

    // 🎯 悬停状态控制
    const startHovering = useCallback(() => {
        if (hoverTimer.current) {
            clearTimeout(hoverTimer.current);
        }
        setIsHovering(true);
    }, []);

    const stopHovering = useCallback(() => {
        hoverTimer.current = setTimeout(() => {
            setIsHovering(false);
        }, 300); // 延迟隐藏，避免闪烁
    }, []);

    // 🎯 活动控件状态
    const activateControl = useCallback((controlId: string) => {
        setActiveControl(controlId);
    }, []);

    const deactivateControl = useCallback(() => {
        setActiveControl(null);
    }, []);

    // 🎯 Toast 通知控制
    const showToast = useCallback((message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') => {
        setToastMessage({
            message,
            type,
            timestamp: Date.now()
        });
    }, []);

    // 使用 useMemo 返回稳定的方法对象
    const methods = useMemo(() => ({
        showInfo: (message: string) => showToast(message, 'info'),
        showSuccess: (message: string) => showToast(message, 'success'),
        showWarning: (message: string) => showToast(message, 'warning'),
        showError: (message: string) => showToast(message, 'error'),
        hideToast: () => setToastMessage({message: '', timestamp: Date.now()}),
    }), [showToast]);

    const hideToast = useCallback(() => {
        setToastMessage(prev => ({ ...prev, message: '' }));
    }, []);

    const showSuccess = useCallback((message: string) => {
        showToast(message, 'success');
    }, [showToast]);

    const showError = useCallback((message: string) => {
        showToast(message, 'error');
    }, [showToast]);

    const showWarning = useCallback((message: string) => {
        showToast(message, 'warning');
    }, [showToast]);

    const showInfo = useCallback((message: string) => {
        showToast(message, 'info');
    }, [showToast]);

    // 🎯 工具提示控制
    const showTooltip = useCallback((content: string, x: number, y: number) => {
        if (tooltipTimer.current) {
            clearTimeout(tooltipTimer.current);
        }

        setTooltip({ content, x, y });
    }, []);

    const hideTooltip = useCallback(() => {
        tooltipTimer.current = setTimeout(() => {
            setTooltip(null);
        }, 200); // 延迟隐藏，避免闪烁
    }, []);

    const updateTooltipPosition = useCallback((x: number, y: number) => {
        setTooltip(prev => prev ? { ...prev, x, y } : null);
    }, []);

    // 🎯 窗口大小变化处理
    const handleResize = useCallback(() => {
        const width = window.innerWidth;
        const height = window.innerHeight;

        setWindowSize({ width, height });
        setIsMobileView(width < 768);

        // 在移动端小屏幕上自动关闭一些面板
        if (width < 768) {
            setIsLyricsPanelVisible(false);
            setIsEqualizerVisible(false);
        }
    }, []);

    const toggleFullscreen = () => {
        if (typeof document === 'undefined') return;

        if (document.fullscreenElement) {
            document.exitFullscreen().catch(console.error);
        } else {
            document.documentElement.requestFullscreen().catch(console.error);
        }
    }

    // 🎯 键盘快捷键处理
    const handleKeyPress = useCallback((event: KeyboardEvent) => {
        // 防止在输入框中触发快捷键
        if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
            return;
        }

        switch (event.key) {
            case ' ':
                event.preventDefault();
                // 空格键播放/暂停
                break;
            case 'Escape':
                closeAllModals();
                break;
            case 'f':
            case 'F':
                if (event.ctrlKey || event.metaKey) {
                    event.preventDefault();
                    showSearch();
                }
                break;
            case 'l':
            case 'L':
                if (event.ctrlKey || event.metaKey) {
                    event.preventDefault();
                    toggleLyricsPanel();
                }
                break;
            case ',':
                if (event.ctrlKey || event.metaKey) {
                    event.preventDefault();
                    showSettings();
                }
                break;
        }
    }, [closeAllModals, showSearch, toggleLyricsPanel, showSettings]);

    // 🎯 加载状态控制
    const startLoading = useCallback(() => {
        setIsLoading(true);
        setLoadingProgress(0);
    }, []);

    const updateLoadingProgress = useCallback((progress: number) => {
        setLoadingProgress(Math.max(0, Math.min(100, progress)));
    }, []);

    const finishLoading = useCallback(() => {
        setIsLoading(false);
        setLoadingProgress(100);

        // 延迟重置进度
        setTimeout(() => {
            setLoadingProgress(0);
        }, 500);
    }, []);

    // 🎯 事件监听器
    useEffect(() => {
        if (!isClient) return;
        // 窗口大小变化监听
        window.addEventListener('resize', handleResize);

        // 键盘快捷键监听
        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('keydown', handleKeyPress);

            if (hoverTimer.current) {
                clearTimeout(hoverTimer.current);
            }
            if (tooltipTimer.current) {
                clearTimeout(tooltipTimer.current);
            }
        };
    }, [handleResize, handleKeyPress, closeAllModals]);

    // 🎯 计算属性
    const isAnyModalOpen = isSearchVisible || isSettingsVisible || isPlaylistVisible || isLyricsPanelVisible || isEqualizerVisible;

    const currentModal =
        isSearchVisible ? 'search' :
            isSettingsVisible ? 'settings' :
                isPlaylistVisible ? 'playlist' :
                    isLyricsPanelVisible ? 'lyrics' :
                        isEqualizerVisible ? 'equalizer' : null;
    return {
        // === 状态 ===
        // 模态框状态
        isSearchVisible,
        isSettingsVisible,
        isPlaylistVisible,
        isLyricsPanelVisible,
        isEqualizerVisible,

        // 视觉状态
        isCoverRotating,
        coverRotationState,
        isSeeking,
        isDragging,
        isHovering,
        activeControl,

        // 通知状态
        toastMessage,
        ...methods,
        tooltip,

        // 响应式状态
        windowSize,
        isMobileView,

        // 加载状态
        isLoading,
        loadingProgress,

        // === 计算属性 ===
        isAnyModalOpen,
        currentModal,

        // === 控制方法 ===
        // 模态框控制
        showSearch,
        hideSearch,
        toggleSearch,
        showSettings,
        hideSettings,
        toggleSettings,
        showPlaylist,
        hidePlaylist,
        togglePlaylist,
        showLyricsPanel,
        hideLyricsPanel,
        toggleLyricsPanel,
        showEqualizer,
        hideEqualizer,
        toggleEqualizer,
        closeAllModals,

        // 视觉状态控制
        startCoverRotation,
        stopCoverRotation,
        toggleCoverRotation,
        startSeeking,
        stopSeeking,
        startDragging,
        stopDragging,
        startHovering,
        stopHovering,
        activateControl,
        deactivateControl,

        // 通知和反馈
        showToast,
        hideToast,
        showSuccess,
        showError,
        showWarning,
        showInfo,
        showTooltip,
        hideTooltip,
        updateTooltipPosition,

        // 响应式处理
        handleResize,
        toggleFullscreen,
        handleKeyPress,

        // 加载状态控制
        startLoading,
        updateLoadingProgress,
        finishLoading,

        // === 状态检查 ===
        get isInteractive() {
            return isHovering || isDragging || isSeeking || activeControl !== null;
        },

        get showControls() {
            return isHovering || isMobileView || isAnyModalOpen;
        },

        get shouldReduceMotion() {
            return isSeeking || isDragging || !isCoverRotating;
        }
    };
};