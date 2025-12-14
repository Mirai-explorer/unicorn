// components/MusicPlayer/index.tsx
/**
 * 音乐播放器主组件
 */
"use client"
import React, { useEffect } from 'react';
import { usePlayer, useTheme } from '@/contexts';
import { PlayerInfo} from "@/components/MiraiPlayer/components/PlayerInfo";
import { PlayerControls } from '@/components/MiraiPlayer/components/PlayerControls';
import { ExpandActions } from '@/components/MiraiPlayer/components/ExpandActions';
import { Modals } from "@/components/MiraiPlayer/components/Modals";
import { ToastContainer} from "react-toastify";

const MusicPlayer: React.FC = () => {
    const { playlist, ui, audio } = usePlayer();
    const { isDark } = useTheme();

    // 初始化音频设置
    useEffect(() => {
        if (playlist.currentTrack) {
            audio.setAudioSource(playlist.currentTrack.audioUrl);
        }
    }, [playlist.currentTrack, audio]);

    // 处理键盘快捷键
    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            // 防止在输入框中触发
            if (event.target instanceof HTMLInputElement ||
                event.target instanceof HTMLTextAreaElement) {
                return;
            }

            switch (event.key) {
                case ' ':
                    event.preventDefault();
                    // 播放/暂停逻辑在 PlayerContext 中处理
                    break;
                case 'Escape':
                    ui.closeAllModals();
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyPress);
        return () => document.removeEventListener('keydown', handleKeyPress);
    }, [ui]);

    const currentTrack = playlist.currentTrack;

    return (
        <div className="player_container">
            <div className="player_wrapper">
                <PlayerInfo imageUrl={currentTrack?.cover} />
                <PlayerControls />
                <ExpandActions />
            </div>
            <ToastContainer />
            <audio ref={audio.audioRef} />
        </div>
    );
};

export default MusicPlayer;