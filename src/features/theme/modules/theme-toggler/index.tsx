"use client";

import clsx from "clsx";
import React from "react";

import ThemeTogglerIcon from "../../assets/theme-toggler.svg";

type Theme = "light" | "dark";

const THEMES: Record<string, Theme> = {
    LIGHT: "light",
    DARK: "dark",
};

const THEME_LS_KEY = "theme";

export default function ThemeToggler(): React.JSX.Element {
    const toggleHtmlDarkClass = () => {
        document.documentElement.classList.toggle(
            "dark",
            localStorage.theme === "dark" ||
                (!(THEME_LS_KEY in localStorage) &&
                    window.matchMedia("(prefers-color-scheme: dark)").matches),
        );
    };

    const effectToggleHtmlDarkClass = React.useEffectEvent(toggleHtmlDarkClass);

    React.useEffect(() => {
        effectToggleHtmlDarkClass();
    }, []);

    const toggleTheme = () => {
        localStorage.theme = localStorage.theme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;
        toggleHtmlDarkClass();
    };

    /* === React Render === */

    const isDark =
        typeof document !== "undefined"
            ? document.documentElement.classList.contains("dark")
            : false;

    const togglerClasses: string = clsx(
        "scale-110 transition hover:scale-125 active:animate-ping",
        "group",
        {
            dark: isDark,
        },
    );

    const iconClasses: string = clsx(
        "icon-size",
        "[&_path]:stroke-text [&_path]:transition",
        "[&_path:last-of-type]:fill-text",
        "group-hover:[&_path]:fill-primary group-hover:[&_path]:stroke-primary",
        "group-focus-visible:[&_path]:fill-primary group-focus-visible:[&_path]:stroke-primary",
        "group-[.dark]:[&_path]:fill-primary group-[.dark]:[&_path]:stroke-primary",
        "group-hover:[&_path:last-of-type]:fill-white",
        "group-focus-visible:[&_path:last-of-type]:fill-white",
        "group-[.dark]:[&_path:last-of-type]:fill-white",
    );

    return (
        <button
            className={togglerClasses}
            onClick={toggleTheme}
            type="button"
            aria-label="Toggle theme"
        >
            <ThemeTogglerIcon className={iconClasses} />
        </button>
    );
}
