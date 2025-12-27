import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { APP_ENVS } from "@/constants/envs";

const IMAGES = {
    ASTRONAUT: APP_ENVS.CDN_URL + "/astronaut.webp",
    MOON: APP_ENVS.CDN_URL + "/moon.webp",
    ROCKET: APP_ENVS.CDN_URL + "/rocket.webp",
};

export default async function BlastPortfolio(): Promise<React.JSX.Element> {
    const t = await getTranslations("home");

    return (
        <div className="grid gap-12">
            <div className="relative -z-10 mx-auto lg:mx-0">
                <svg
                    viewBox="0 0 530 520"
                    className="w-65 h-65 lg:w-full lg:h-auto lg:max-h-140 block animate-glow"
                >
                    <path
                        d="M499.82 289.435C608.907 574.829 396.713 514.72 269.524 514.72C142.336 514.72 -23.8999 492.494 2.86678 253.066C59.9356 124.26 160.517 0 287.706 0C414.894 0 499.82 165.014 499.82 289.435Z"
                        className="fill-bg-secondary"
                    />
                </svg>

                <Image
                    src={IMAGES.ASTRONAUT}
                    alt={t("game.astronaut-alt")}
                    width={200}
                    height={200}
                    className="absolute h-52 w-32 bottom-0 right-3/12 animate-float lg:w-50 lg:h-auto lg:right-10 xl:right-20 xl:top-25 2xl:right-35 2xl:top-35"
                />

                <Image
                    src={IMAGES.MOON}
                    alt={t("game.moon-alt")}
                    width={130}
                    height={130}
                    className="h-15 w-15 absolute bottom-10 left-5 animate-float lg:h-32.5 lg:w-32.5 lg:left-18 xl:bottom-15 xl:left-30 2xl:left-60 "
                />

                <Image
                    src={IMAGES.ROCKET}
                    alt={t("game.rocket-alt")}
                    width={130}
                    height={130}
                    className="h-15 w-15 absolute bottom-5 right-4 animate-float lg:h-32.5 lg:w-32.5 lg:left-23 lg:top-30 xl:left-35 xl:top-40 2xl:left-45"
                />
            </div>

            <button
                type="button"
                className="hidden btn btn-secondary lg:block  lg:mx-auto"
            >
                Blast this Portfolio!
            </button>
        </div>
    );
}
