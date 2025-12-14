"use client"
import dynamic from 'next/dynamic';
import {PlayerProvider, SettingsProvider, ThemeProvider, ToastProvider} from "@/contexts";
import './page.css';
const Player = dynamic(() => import("@/components/MiraiPlayer"), {
    ssr: false
});

const Music = () => {
    return (
        <SettingsProvider>
            <PlayerProvider>
                <ToastProvider>
                    <ThemeProvider>
                        <Player />
                    </ThemeProvider>
                </ToastProvider>
            </PlayerProvider>
        </SettingsProvider>
    )
}

export default Music;