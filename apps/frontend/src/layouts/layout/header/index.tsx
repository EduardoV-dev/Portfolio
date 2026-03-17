import { useEffect, useState } from "react";
import AiButton from "./ai-button";
import HeaderCta from "./header-cta";
import HeaderLogo from "./header-logo";
import HeaderNav from "./header-nav";
import MobileMenu from "./mobile-menu";
import styles from "./index.module.css";

interface HeaderProps {
    currentPath: string;
}

export default function Header({ currentPath }: HeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener("keydown", onKeyDown);
        return () => {
            document.removeEventListener("keydown", onKeyDown);
        };
    }, []);

    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMenuOpen]);

    return (
        <>
            <header className={styles.header} id="site-header">
                <div className={styles["header__inner"]}>
                    <HeaderLogo />
                    <HeaderNav currentPath={currentPath} />

                    <div className={styles["header__actions"]}>
                        <AiButton />
                        <HeaderCta id="cta-desktop" />
                    </div>

                    <button
                        className={styles.hamburger}
                        id="hamburger-btn"
                        aria-label="Open menu"
                        aria-expanded={isMenuOpen}
                        aria-controls="mobile-menu"
                        onClick={() => setIsMenuOpen(true)}
                        type="button"
                    >
                        <span className={styles["hamburger__bar"]} />
                        <span className={styles["hamburger__bar"]} />
                        <span className={styles["hamburger__bar"]} />
                    </button>
                </div>
            </header>

            <MobileMenu
                currentPath={currentPath}
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
            />
        </>
    );
}
