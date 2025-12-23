import { useTranslations } from "next-intl";

export default function Footer(): React.JSX.Element {
    const t = useTranslations("footer");

    return (
        <footer className="min-h-7 p-4 bg-bg-secondary text-text text-center border-b-8 border-primary">
            <p>
                {t("made-by")} &copy; Eduardo.dev | Full Stack Web Developer,{" "}
                {new Date().getFullYear()}. - {t("rights")}
            </p>
        </footer>
    );
}
