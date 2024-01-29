import { createContext, useContext, useState } from "react";
import { ThemeContextType } from "../constants/types";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeContext = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useThemeContext must be used within a ThemeContextProvider');
    }
    return context;
}

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('dark');
    return (
        <ThemeContext.Provider value={{ currentTheme, setCurrentTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}