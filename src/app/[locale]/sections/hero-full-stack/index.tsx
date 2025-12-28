import { getTranslations } from "next-intl/server";

import { APP_ROUTES } from "@/constants/routes";
import { Link } from "@/i18n/navigation";

export default async function HeroFullStack(): Promise<React.JSX.Element> {
    const t = await getTranslations("home");

    return (
        <div className="grid gap-4 items-start">
            <h1 className="font-normal leading-snug text-3xl lg:text-4xl">
                <strong>{t("hero.title.p1")}</strong> <br />
                {t("hero.title.p2")}
            </h1>

            <h2 className="font-normal text-sm leading-relaxed">{t("hero.subtitle")}</h2>

            <div className="flex gap-4 flex-wrap mt-6">
                <Link
                    href={APP_ROUTES.PROJECTS.HOME}
                    className="btn btn-primary"
                >
                    {t("hero.cta.projects")}
                </Link>

                <Link
                    href={APP_ROUTES.CONTACT}
                    className="btn btn-outlined-primary"
                >
                    {t("hero.cta.contact")}
                </Link>

                <button
                    type="button"
                    className="btn btn-secondary lg:hidden"
                >
                    {t("game.blast-cta")}
                </button>
            </div>
        </div>
    );
}
