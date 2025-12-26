"use client";

import React from "react";

interface ThemeContextType {
    isDarkMode: boolean;
    toggleTheme(): void;
}

const ThemeContext = React.createContext<ThemeContextType>({
    isDarkMode: false,
    toggleTheme: () => {},
});

interface Props {
    children: React.ReactNode;
}

type Theme = "light" | "dark";

const THEMES: Record<string, Theme> = {
    LIGHT: "light",
    DARK: "dark",
};

const THEME_LS_KEY = "theme";

export default function ThemeProvider({ children }: Readonly<Props>) {
    const [isDarkMode, setIsDarkMode] = React.useState<boolean>(false);

    const applyUserThemePreference = () => {
        document.documentElement.classList.toggle(
            "dark",
            localStorage.theme === THEMES.DARK ||
                (!(THEME_LS_KEY in localStorage) &&
                    window.matchMedia("(prefers-color-scheme: dark)").matches),
        );
    };

    const toggleTheme = () => {
        setIsDarkMode((prev) => !prev);
        localStorage.theme = localStorage.theme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;
        applyUserThemePreference();
    };

    const applyPreferenceEvent = React.useEffectEvent(applyUserThemePreference);

    React.useEffect(() => {
        setIsDarkMode(localStorage.theme === THEMES.DARK);
        applyPreferenceEvent();
    }, []);

    const value: ThemeContextType = {
        isDarkMode,
        toggleTheme,
    };

    return <ThemeContext.Provider {...{ value }}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextType {
    return React.use(ThemeContext);
}
