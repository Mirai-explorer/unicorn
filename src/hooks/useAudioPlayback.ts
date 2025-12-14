// hooks/useAudioPlayback.ts
import { useState, useRef, useCallback, useEffect } from 'react';
import { AudioLoadState, PlaybackError } from '@/types';
import { AudioUtils, TimeUtils } from '@/utils';

export const useAudioPlayback = () => {
    // 状态
    // 🎯 核心播放状态
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolumeState] = useState(1);
    const [playbackRate, setPlaybackRate] = useState(1);

    // 🎯 加载和错误状态
    const [loadState, setLoadState] = useState<AudioLoadState>('idle');
    const [error, setError] = useState<PlaybackError | null>(null);

    // 🎯 重载和缓冲状态
    const [needsReload, setNeedsReload] = useState(false);
    const [isBuffering, setIsBuffering] = useState(false);

    const audioRef = useRef<HTMLAudioElement | null>(
        typeof Audio !== "undefined" ? new Audio() : null
    );
    const isReady = useRef(false);

    // 定时器引用，用于保存播放时的定时器
    const progressUpdateIntervalRef = useRef<NodeJS.Timeout | null>(null);
    // 定时器引用，用于定期检查 duration
    const durationCheckIntervalRef = useRef<NodeJS.Timeout | null>(null);
    
    // 手动更新 currentTime 的函数，用于在需要时手动触发更新
    const updateCurrentTime = useCallback(() => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
            // 同时尝试获取 duration
            if (audioRef.current.duration && audioRef.current.duration > 0) {
                setDuration(audioRef.current.duration);
            }
        }
    }, []);
    
    // 定期检查并更新 duration
    const checkDuration = useCallback(() => {
        if (!audioRef.current) return;
        
        console.log('⏱️ 检查 duration - 当前值:', audioRef.current.duration);
        
        if (audioRef.current.duration && audioRef.current.duration > 0) {
            setDuration(audioRef.current.duration);
            console.log('✅ 更新 duration 为:', audioRef.current.duration);
            // 如果已经获取到 duration，停止检查
            if (durationCheckIntervalRef.current) {
                clearInterval(durationCheckIntervalRef.current);
                durationCheckIntervalRef.current = null;
            }
        }
    }, []);
    
    // 启动 duration 检查定时器
    const startDurationCheck = useCallback(() => {
        // 清除之前的定时器（如果存在）
        if (durationCheckIntervalRef.current) {
            clearInterval(durationCheckIntervalRef.current);
        }
        
        // 设置定时器，每 500ms 检查一次 duration
        durationCheckIntervalRef.current = setInterval(() => {
            checkDuration();
        }, 500);
        
        console.log('⏱️ 启动 duration 检查定时器');
    }, [checkDuration]);
    
    // 停止 duration 检查定时器
    const stopDurationCheck = useCallback(() => {
        if (durationCheckIntervalRef.current) {
            clearInterval(durationCheckIntervalRef.current);
            durationCheckIntervalRef.current = null;
            console.log('⏱️ 停止 duration 检查定时器');
        }
    }, []);
    
    // 启动进度更新定时器
    const startProgressUpdate = useCallback(() => {
        // 清除之前的定时器（如果存在）
        if (progressUpdateIntervalRef.current) {
            clearInterval(progressUpdateIntervalRef.current);
        }
        
        // 设置定时器，每秒更新一次进度
        progressUpdateIntervalRef.current = setInterval(() => {
            if (audioRef.current && !audioRef.current.paused) {
                updateCurrentTime();
            } else {
                // 如果音频暂停，清除定时器
                clearInterval(progressUpdateIntervalRef.current!);
                progressUpdateIntervalRef.current = null;
            }
        }, 1000);
        
        console.log('⏱️ 启动进度更新定时器');
    }, [updateCurrentTime]);
    
    // 停止进度更新定时器
    const stopProgressUpdate = useCallback(() => {
        if (progressUpdateIntervalRef.current) {
            clearInterval(progressUpdateIntervalRef.current);
            progressUpdateIntervalRef.current = null;
            console.log('⏱️ 停止进度更新定时器');
        }
    }, []);
    
    // 控制方法
    // 🎯 播放控制
    const play = useCallback(async () => {
        if (!audioRef.current) return;

        try {
            console.log('▶️ play() 被调用 - 音频状态:', {
                src: audioRef.current.src,
                currentTime: audioRef.current.currentTime,
                duration: audioRef.current.duration,
                paused: audioRef.current.paused,
                readyState: audioRef.current.readyState,
                networkState: audioRef.current.networkState
            });
            
            // 修复：使用正确的 Promise 处理方式
            const playPromise = audioRef.current.play();
            
            // 检查 playPromise 是否存在（某些浏览器可能不返回 Promise）
            if (playPromise) {
                await playPromise;
            }
            
            console.log('✅ 音频播放成功 - 播放状态:', !audioRef.current.paused);
            
            // 手动更新播放状态
            setIsPlaying(!audioRef.current.paused);
            setError(null);
            
            // 立即触发一次 currentTime 更新，确保 UI 更新
            updateCurrentTime();
            
            // 启动进度更新定时器，确保进度持续更新
            startProgressUpdate();
            
            console.log('🎉 播放状态更新完成');
        } catch (err) {
            console.error('播放失败:', err);
            const playbackError = AudioUtils.handlePlayError(err);
            setError(playbackError);
            setIsPlaying(false);
            setLoadState('error');
        }
    }, [updateCurrentTime, startProgressUpdate]);

    const pause = useCallback(() => {
        if (!audioRef.current) return;
        
        console.log('⏸️ pause() 被调用 - 当前进度:', audioRef.current.currentTime);
        
        audioRef.current.pause();
        
        // 停止进度更新定时器
        stopProgressUpdate();
        
        // 立即更新一次当前时间，确保 UI 显示正确
        updateCurrentTime();
        
        setIsPlaying(false);
        console.log('⏸️ 暂停完成 - 当前进度:', audioRef.current.currentTime);
    }, [stopProgressUpdate, updateCurrentTime]);

    // 🎯 进度控制
    const seek = useCallback((time: number) => {
        if (audioRef.current && time >= 0 && time <= duration) {
            audioRef.current.currentTime = time;
            setCurrentTime(time);
        }
    }, [duration]);

    // 🎯 音量控制
    const setVolume = useCallback((level: number) => {
        const clampedVolume = Math.max(0, Math.min(1, level));
        if (audioRef.current) {
            audioRef.current.volume = clampedVolume;
        }
        setVolumeState(clampedVolume);
    }, []);

    // 🎯 播放速率控制
    const setRate = useCallback((rate: number) => {
        const validRates = [0.5, 0.75, 1, 1.25, 1.5, 2];
        const clampedRate = validRates.includes(rate) ? rate : 1;

        if (audioRef.current) {
            audioRef.current.playbackRate = clampedRate;
        }
        setPlaybackRate(clampedRate);
    }, []);

    // 音频源管理
    // 🎯 设置音频源
    const setAudioSource = useCallback((src: string) => {
        if (!audioRef.current) return;

        // 只有当音频源不同或为空时才重新设置，避免重置进度
        if (audioRef.current.src === src) {
            console.log('🎵 音频源未变化，跳过重新加载');
            // 即使音频源未变化，也尝试更新一下 duration
            if (audioRef.current.duration > 0) {
                setDuration(audioRef.current.duration);
            }
            return;
        }

        console.log('🎵 设置新音频源:', src);
        setLoadState('loading');
        setNeedsReload(false);
        
        // 重置 duration 和 currentTime
        setDuration(0);
        setCurrentTime(0);

        // 保存当前播放状态
        const wasPlaying = !audioRef.current.paused;
        
        audioRef.current.src = src;
        
        // 添加 loadeddata 事件的一次性监听器，确保能获取到 duration
        const handleLoadedDataOnce = () => {
            console.log('📦 一次性 loadeddata 事件 - duration:', audioRef.current?.duration);
            if (audioRef.current?.duration) {
                setDuration(audioRef.current.duration);
            }
            // 移除一次性监听器
            audioRef.current?.removeEventListener('loadeddata', handleLoadedDataOnce);
        };
        
        audioRef.current.addEventListener('loadeddata', handleLoadedDataOnce);
        
        // 添加 canplaythrough 事件的一次性监听器，确保能获取到 duration
        const handleCanPlayThroughOnce = () => {
            console.log('▶️ 一次性 canplaythrough 事件 - duration:', audioRef.current?.duration);
            if (audioRef.current?.duration) {
                setDuration(audioRef.current.duration);
            }
            // 移除一次性监听器
            audioRef.current?.removeEventListener('canplaythrough', handleCanPlayThroughOnce);
        };
        
        audioRef.current.addEventListener('canplaythrough', handleCanPlayThroughOnce);
        
        // 开始加载音频
        audioRef.current.load();
        
        // 启动 duration 检查定时器，确保能获取到正确的时长
        startDurationCheck();

        // 如果之前是在播放状态，自动播放新源
        if (wasPlaying) {
            setTimeout(() => play(), 100);
        }
    }, [play, startDurationCheck]);

    // 🎯 重载当前音频
    const reloadAudio = useCallback(() => {
        if (audioRef.current?.src) {
            setAudioSource(audioRef.current.src);
        }
    }, [setAudioSource]);

    // 音频事件处理
    // 🎯 音频事件监听
    useEffect(() => {
        const audio = audioRef.current;
        console.log(audio,'\\');
        if (!audio) return;

        const handleLoadedMetadata = () => {
            console.log('🔍 loadedmetadata event - duration:', audio.duration);
            setDuration(audio.duration);
            setLoadState('loaded');
        };

        const handleTimeUpdate = () => {
            console.log('⏱️ timeupdate event - currentTime:', audio.currentTime);
            setCurrentTime(audio.currentTime);
        };

        const handleLoadedData = () => {
            console.log('📦 loadeddata event - duration:', audio.duration);
            setDuration(audio.duration);
        };

        const handleCanPlay = () => {
            console.log('▶️ canplay event - duration:', audio.duration);
            setDuration(audio.duration);
        };

        const handleEnded = () => {
            console.log('🎵 ended event');
            // 停止进度更新定时器
            stopProgressUpdate();
            // 停止 duration 检查定时器
            stopDurationCheck();
            // 重置播放状态
            setIsPlaying(false);
            setCurrentTime(0);
        };

        const handleWaiting = () => {
            console.log('⏳ waiting event');
            setIsBuffering(true);
        };
        const handlePlaying = () => {
            console.log('▶️ playing event');
            setIsBuffering(false);
            // 当音频开始播放时，启动进度更新定时器
            startProgressUpdate();
        };
        const handleError = () => {
            console.error('❌ error event - error:', audio.error);
            setError({ type: 'decode_error', message: '音频加载失败', timestamp: Date.now(), recoverable: false });
            setLoadState('error');
            // 停止进度更新定时器
            stopProgressUpdate();
            // 停止 duration 检查定时器
            stopDurationCheck();
        };

        // 绑定事件
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('loadeddata', handleLoadedData);
        audio.addEventListener('canplay', handleCanPlay);
        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('ended', handleEnded);
        audio.addEventListener('waiting', handleWaiting);
        audio.addEventListener('playing', handlePlaying);
        audio.addEventListener('error', handleError);

        return () => {
            // 清除所有事件监听器
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('loadeddata', handleLoadedData);
            audio.removeEventListener('canplay', handleCanPlay);
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('ended', handleEnded);
            audio.removeEventListener('waiting', handleWaiting);
            audio.removeEventListener('playing', handlePlaying);
            audio.removeEventListener('error', handleError);
            
            // 确保在组件卸载时清除定时器
            stopProgressUpdate();
        };
    }, [startProgressUpdate, stopProgressUpdate]);
    
    // 确保在组件卸载时清除所有定时器
    useEffect(() => {
        return () => {
            stopProgressUpdate();
            stopDurationCheck();
        };
    }, [stopProgressUpdate, stopDurationCheck]);

    // 🎯 返回完整的接口
    return {
        // === 状态 ===
        // 播放状态
        isPlaying,
        currentTime,
        duration,
        volume,
        playbackRate,

        // 系统状态
        loadState,
        error,
        needsReload,
        isBuffering,

        // === 控制方法 ===
        // 播放控制
        play,
        pause,
        seek,

        // 设置方法
        setVolume,
        setPlaybackRate: setRate,
        setAudioSource,
        setNeedsReload,

        // 系统方法
        reloadAudio,
        clearError: () => setError(null),

        // === 引用 ===
        audioRef,

        // === 计算属性 ===
        progressPercentage: duration > 0 ? (currentTime / duration) * 100 : 0,
        formattedCurrentTime: TimeUtils.formatPlaybackTime(currentTime),
        formattedDuration: TimeUtils.formatPlaybackTime(duration),
        remainingTime: duration - currentTime,
        formattedRemainingTime: TimeUtils.formatPlaybackTime(duration - currentTime),

        // === 状态检查 ===
        get canPlay() { return loadState === 'loaded' && !error; },
        get isLoading() { return loadState === 'loading'; },
        get hasError() { return error !== null; }
    };
};