"use client";

import clsx from "clsx";
import { _Translator, useLocale, useTranslations } from "next-intl";
import React from "react";

import DragCloseDrawer from "@/components/drag-close-drawer";
import { usePathname, useRouter } from "@/i18n/navigation";

import CheckIcon from "../../assets/check.svg";
import GlobeIcon from "../../assets/globe.svg";
import NicaraguaFlagIcon from "../../assets/nicaragua-flag.svg";
import USAFlagIcon from "../../assets/usa-flag.svg";

interface Language {
    label: string;
    icon: React.ReactNode;
    code: string;
}

const getLanguages = (t: _Translator): Language[] => [
    {
        label: t("spanish"),
        icon: <NicaraguaFlagIcon />,
        code: "es",
    },
    {
        label: t("english"),
        icon: <USAFlagIcon />,
        code: "en",
    },
];

export default function LanguageSelector(): React.JSX.Element {
    const t = useTranslations("language-selector");
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const [isDrawerOpen, setIsDrawerOpen] = React.useState<boolean>(false);

    const handleChange = (newLocale: string) => {
        router.replace(pathname, { locale: newLocale });
    };

    const getLanguageItemClasses = (langCode: string): string =>
        clsx(
            "flex justify-between items-center gap-4 bg-main-bg rounded-sm px-4 py-2 group transition",
            {
                "shadow-[0px_0px_2px_2px_rgba(93,_103,_200,_0.5)]": langCode === locale,
            },
        );

    return (
        <>
            <button
                type="button"
                onClick={() => setIsDrawerOpen(true)}
            >
                <GlobeIcon className="icon-size [&_path]:fill-text" />
            </button>

            <DragCloseDrawer
                open={isDrawerOpen}
                setOpen={setIsDrawerOpen}
                className="max-w-md"
            >
                <p className="text-xl font-semibold">{t("title")}</p>
                <ul
                    className="mt-4 grid gap-4 select-none"
                    style={{
                        gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 10rem), 1fr))",
                    }}
                >
                    {getLanguages(t).map((lang) => (
                        <button
                            className={getLanguageItemClasses(lang.code)}
                            key={lang.code}
                            onClick={() => handleChange(lang.code)}
                        >
                            <div className="flex items-center gap-2">
                                {lang.icon}
                                {lang.label}
                            </div>

                            <CheckIcon
                                className={clsx("scale-0 opacity-0 transition", {
                                    "scale-100 opacity-100": lang.code === locale,
                                })}
                            />
                        </button>
                    ))}
                </ul>
            </DragCloseDrawer>
        </>
    );
}
