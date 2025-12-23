import Link from "next/link";
import React from "react";

import { LanguageSelector } from "@/features/language";
import { ThemeToggler } from "@/features/theme";

import EmailIcon from "./assets/email.svg";
import GithubIcon from "./assets/github.svg";
import LinkedInIcon from "./assets/linkedin.svg";
import { NavLinkItem } from "./header.types";
import Navbar from "./navbar";

const SOCIAL_NETWORKS: NavLinkItem[] = [
    {
        label: <EmailIcon className="icon-size [&_path]:stroke-text" />,
        href: `mailto:eduardovarela139@gmail.com`,
    },
    {
        label: <LinkedInIcon className="icon-size [&_path]:fill-text" />,
        href: "https://www.linkedin.com/in/eduardov-dev/",
    },
    {
        label: <GithubIcon className="icon-size [&_path]:fill-text" />,
        href: "https://github.com/EduardoV-dev",
    },
];

export default function Header(): React.JSX.Element {
    const NetworkAndControlElements: React.JSX.Element = (
        <>
            <div className="flex flex-wrap gap-4 items-center">
                {SOCIAL_NETWORKS.map(({ href, label }) => (
                    <a
                        {...{ href }}
                        key={href + label}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {label}
                    </a>
                ))}
            </div>

            <div className="flex flex-wrap gap-4 items-center">
                <LanguageSelector />
                <ThemeToggler />
            </div>
        </>
    );

    return (
        <header className="sticky top-0 bg-bg-secondary">
            <div className="container mx-auto px-6 flex flex-row-reverse items-center justify-between h-16 lg:flex-row">
                <Navbar>{NetworkAndControlElements}</Navbar>

                <Link
                    className="text-xl text-text font-semibold transition hover:text-primary lg:text-center 2xl:text-left 2xl:-translate-x-full"
                    href="/"
                >
                    Eduardo.dev
                </Link>

                <section className="hidden lg:flex flex-wrap gap-6 items-center">
                    {NetworkAndControlElements}
                </section>
            </div>
        </header>
    );
}
