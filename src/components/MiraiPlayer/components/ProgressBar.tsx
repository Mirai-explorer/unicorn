// components/MusicPlayer/components/ProgressBar.tsx
/**
 * 进度条组件
 */

import React, { useState, useRef } from 'react';
import { usePlayer } from '@/contexts';
import { TimeUtils } from '@/utils';

export const ProgressBar: React.FC = () => {
    const { audio, ui } = usePlayer();
    const [isDragging, setIsDragging] = useState(false);
    const [dragValue, setDragValue] = useState(0);
    const progressBarRef = useRef<HTMLDivElement>(null);

    const currentTime = isDragging ? dragValue : audio.currentTime;
    const duration = audio.duration || 0;

    const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        updateProgress(e);
        ui.startSeeking();
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isDragging) {
            updateProgress(e);
        }
    };

    const handleMouseUp = () => {
        if (isDragging) {
            setIsDragging(false);
            audio.seek(dragValue);
            ui.stopSeeking();
        }
    };

    const updateProgress = (e: React.MouseEvent) => {
        if (!progressBarRef.current) return;

        const rect = progressBarRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = Math.max(0, Math.min(1, x / rect.width));
        const newTime = percentage * duration;

        setDragValue(newTime);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        setIsDragging(true);
        updateTouchProgress(e);
        ui.startSeeking();
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (isDragging) {
            updateTouchProgress(e);
        }
    };

    const handleTouchEnd = () => {
        if (isDragging) {
            setIsDragging(false);
            audio.seek(dragValue);
            ui.stopSeeking();
        }
    };

    const updateTouchProgress = (e: React.TouchEvent) => {
        if (!progressBarRef.current) return;

        const touch = e.touches[0];
        const rect = progressBarRef.current.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const percentage = Math.max(0, Math.min(1, x / rect.width));
        const newTime = percentage * duration;

        setDragValue(newTime);
    };

    return (
        <div className="progress_bar">
            <div className="track_unit"
                 role="slider"
                 ref={progressBarRef}
                 onMouseDown={handleMouseDown}
                 onMouseMove={handleMouseMove}
                 onMouseUp={handleMouseUp}
                 onMouseLeave={handleMouseUp}
                 onTouchStart={handleTouchStart}
                 onTouchMove={handleTouchMove}
                 onTouchEnd={handleTouchEnd}
            >
                <div className="progress_buffered" />
                <div className="progress_completed" style={{
                    width: `${progressPercentage}%`
                }} />
                <div className="progress_handle" style={{
                    left: `${progressPercentage}%`
                }} />

                <div className="time_preview">

                </div>
            </div>

            <div className="time_unit">
                <div className="time_display current">
                    {TimeUtils.formatPlaybackTime(currentTime)}
                </div>
                <div className="time_display duration">
                    {TimeUtils.formatPlaybackTime(duration)}
                </div>
            </div>
        </div>
    );
};