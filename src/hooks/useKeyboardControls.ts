import { useEffect } from "react";
import {PlayerActions} from "@/types/player";

export function useKeyboardControls(playerActions: PlayerActions) {
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            switch (e.code) {
                case "Space":
                    e.preventDefault();
                    playerActions.togglePlay();
                    break;
                case "ArrowRight":
                    playerActions.playNext();
                    break;
                case "ArrowLeft":
                    playerActions.playPrev();
                    break;
                case "ArrowUp":
                    playerActions.setVolume(Math.min(playerActions.state.volume + 0.1, 1));
                    break;
                case "ArrowDown":
                    playerActions.setVolume(Math.max(playerActions.state.volume - 0.1, 0));
                    break;
            }
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [playerActions]);
}