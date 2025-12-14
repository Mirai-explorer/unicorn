// src/types/player.ts

export interface Track {
    id: string;         // 唯一标识
    url: string;        // 音频文件地址
    title?: string;     // 可选，用于 UI 显示
    artist?: string;    // 可选
    cover?: string;     // 可选专辑封面
    album?: string;   // 专辑名称
    duration?: number;  // 可选
}

export interface PlaybackState {
    currentTrack: Track | null;
    isPlaying: boolean;
    volume: number;
    playMode: "loop" | "shuffle" | "single";
    currentTime: number;
    setCurrentTrack: (track: Track | null) => void;
    setIsPlaying: (playing: boolean) => void;
    setVolume: (vol: number) => void;
    setPlayMode: (mode: "loop" | "shuffle" | "single") => void;
    updateCurrentTime: (time: number) => void;
}

export interface QueueManager {
    queue: Track[];
    currentIndex: number;
    addTrack: (track: Track) => void;
    removeTrack: (track: Track) => void;
    getNextTrack: (currentTrack?: Track) => Track | null;
    getPrevTrack: (currentTrack?: Track) => Track | null;
    clearQueue: () => void;
}

export interface PlayerActions {
    togglePlay: () => void;
    play: () => void;
    pause: () => void;
    playNext: () => void;
    playPrev: () => void;
    setVolume: (volume: number) => void;
    seek: (time: number) => void;
    state: {
        volume: number;
        isPlaying: boolean;
    };
}

export interface PlaybackActions {
    play: (track?: Track) => void;      // 播放指定 track，或当前 track
    pause: () => void;                  // 暂停
    togglePlay: () => void;             // 播放/暂停切换
    playNext: () => void;               // 播放下一首
    playPrev: () => void;               // 播放上一首
    seek: (time: number) => void;       // 跳转到指定时间
    setVolume: (vol: number) => void;   // 设置音量
}

export interface LyricsLine {
    time: number;    // 对应播放时间（秒或毫秒）
    text: string;    // 歌词内容
}

export interface LyricsManager {
    lyrics: LyricsLine[];                   // 当前歌曲所有歌词
    currentLineIndex: number;               // 当前播放的歌词索引
    goToLine: (index: number) => void;     // 点击歌词跳转
    updateCurrentLine: (time: number) => void; // 根据播放时间更新当前行
}