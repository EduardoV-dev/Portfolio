"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { _Translator, useTranslations } from "next-intl";
import React from "react";

import { APP_ENVS } from "@/constants/envs";
import { APP_ROUTES } from "@/constants/routes";

import { NavLinkItem } from "./header.types";

export const getNavigationLinks: (t: _Translator) => NavLinkItem[] = (t: _Translator) => [
    { label: t("home"), href: APP_ROUTES.HOME },
    { label: t("about"), href: APP_ROUTES.ABOUT },
    { label: t("projects"), href: APP_ROUTES.PROJECTS.HOME },
    { label: t("contact"), href: APP_ROUTES.CONTACT },
];

interface Props {
    children: React.ReactNode;
}

export default function Navbar({ children }: Props): React.JSX.Element {
    const t = useTranslations("header");
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState<boolean>(false);

    const onMenuDisplayToggle = (): void => setIsMobileMenuOpen((state) => !state);

    /*  React Render */

    const getNavLinkClasses = (href: string): string =>
        clsx("font-medium text-text transition hover:text-primary", {
            "text-primary font-semibold": pathname.includes(href),
        });

    const menuBtnClasses: string = clsx(
        "flex flex-col justify-center gap-2 items-center transition lg:hidden",
        {
            "[&>span:nth-child(2)]:-translate-x-8 [&>span:nth-child(2)]:opacity-0 [&>span:first-child]:rotate-45 [&>span:first-child]:translate-y-3 [&>span:first-child]:scale-75 [&>span:last-child]:-rotate-45 [&>span:last-child]:-translate-y-3 [&>span:last-child]:scale-75":
                isMobileMenuOpen,
        },
    );

    const navbarClasses: string = clsx(
        "w-[calc(100%_-_2rem)] max-w-xs fixed top-1/4 left-2/4 -translate-x-2/4 -translate-y-2/4 flex flex-col gap-2 items-center bg-bg-secondary py-6 shadow rounded-sm opacity-0 scale-0 transition lg:w-auto lg:max-w-none lg:relative lg:top-0 lg:left-0 lg:translate-x-0 lg:translate-y-0 lg:flex-row lg:gap-8 lg:bg-transparent lg:py-0 lg:shadow-none lg:rounded-none lg:opacity-100 lg:scale-100",
        {
            "opacity-100 scale-95": isMobileMenuOpen,
        },
    );

    return (
        <>
            <nav className={navbarClasses}>
                {getNavigationLinks(t).map(({ label, href }) => (
                    <Link
                        className={getNavLinkClasses(href)}
                        {...{ href }}
                        key={label + href}
                    >
                        {label}
                    </Link>
                ))}

                <a
                    className="btn btn-outlined-primary"
                    href={APP_ENVS.CDN_URL + "/Eduardo+Varela++-+FS+CV.pdf"}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {t("resume")}
                </a>

                <section className="mt-6 lg:hidden flex flex-wrap gap-6 items-center">
                    {children}
                </section>
            </nav>

            <button
                className={menuBtnClasses}
                onClick={onMenuDisplayToggle}
                type="button"
                aria-label="Toggle mobile menu"
            >
                <span className="block bg-text rounded-sm w-10 h-1 transition" />
                <span className="block bg-text rounded-sm w-10 h-1 transition" />
                <span className="block bg-text rounded-sm w-10 h-1 transition" />
            </button>
        </>
    );
}
