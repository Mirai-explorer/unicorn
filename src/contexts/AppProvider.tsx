import { ReactNode } from "react";
import { ThemeProvider } from "./ThemeContext";
import { ToastProvider } from "./ToastContext";
import { PlayerProvider } from "./PlayerContext";

interface AppProviderProps {
    children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
    return (
        <ThemeProvider>
            <ToastProvider>
                <PlayerProvider>
                    {children}
                </PlayerProvider>
            </ToastProvider>
        </ThemeProvider>
    );
};