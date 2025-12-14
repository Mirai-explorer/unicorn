import { useEffect } from "react";
import { usePlaybackState } from "./usePlaybackState";

type PlayerStateType = ReturnType<typeof usePlaybackState>;

export function useMediaSession(playerState: PlayerStateType, playerActions:  {
    play: () => void;
    pause: () => void;
    playNext: () => void;
    playPrev: () => void;
}) {
    useEffect(() => {
        if (!("mediaSession" in navigator)) return;

        navigator.mediaSession.metadata = new MediaMetadata({
            title: playerState.currentTrack?.title || "",
            artist: playerState.currentTrack?.artist || "",
            album: playerState.currentTrack?.album || "",
            artwork: playerState.currentTrack?.cover
                ? [{ src: playerState.currentTrack.cover, sizes: "512x512", type: "image/png" }]
                : [],
        });

        navigator.mediaSession.setActionHandler("play", playerActions.play);
        navigator.mediaSession.setActionHandler("pause", playerActions.pause);
        navigator.mediaSession.setActionHandler("previoustrack", playerActions.playPrev);
        navigator.mediaSession.setActionHandler("nexttrack", playerActions.playNext);

        navigator.mediaSession.playbackState = playerState.isPlaying ? "playing" : "paused";
    }, [playerState, playerActions]);
}
