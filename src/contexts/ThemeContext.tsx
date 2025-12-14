export type Theme = "light" | "dark" | "custom";

export interface ThemeContextValue {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

import { createContext, useContext, useState, ReactNode } from "react";

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useTheme must be used within ThemeProvider");
    return context;
};

interface ThemeProviderProps {
    children: ReactNode;
    defaultTheme?: Theme;
}

export const ThemeProvider = ({ children, defaultTheme = "light" }: ThemeProviderProps) => {
    const [theme, setTheme] = useState<Theme>(defaultTheme);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
