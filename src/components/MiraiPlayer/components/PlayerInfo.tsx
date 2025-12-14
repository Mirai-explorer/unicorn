import { LyricsPanel } from './LyricsPanel';
import { usePlayer } from "@/contexts";
import { Modals } from "@/components/MiraiPlayer/components/Modals";
import React from "react";

export function PlayerInfo({ imageUrl, } : { imageUrl?: string }) {
    const { playlist, settings, audio, ui } = usePlayer();
    const { currentTrack } = playlist;
    return (
        <section className="info">
            <Modals />

            <div className="aside">
                <div className="cover">
                    <img
                        src={currentTrack?.cover}
                        width="100%"
                        height="100%"
                    />
                </div>
            </div>

            <div className="core">
                <div className="meta">
                    <div className="title">{currentTrack?.title}</div>
                    <div className="artists">{currentTrack?.artist}</div>
                </div>

                <LyricsPanel />
            </div>
        </section>
    );
}