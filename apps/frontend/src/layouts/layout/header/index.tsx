import { useEffect, useState } from "react";
import { useChatStore } from "@/store/chat";
import AiButton from "./ai-button";
import AiChatModal from "./ai-chat-modal";
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
    const { isOpen: isChatOpen, openChat, closeChat } = useChatStore();

    // Escape closes both menu and chat
    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsMenuOpen(false);
                closeChat();
            }
            // Ctrl+K opens chat
            if ((event.ctrlKey || event.metaKey) && event.key === "k") {
                event.preventDefault();
                openChat();
            }
        };

        document.addEventListener("keydown", onKeyDown);
        return () => {
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [openChat, closeChat]);

    // Scroll-lock when menu or chat is open
    useEffect(() => {
        document.body.style.overflow = isMenuOpen || isChatOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMenuOpen, isChatOpen]);

    return (
        <>
            <header className={styles.header} id="site-header">
                <div className={styles["header__inner"]}>
                    <HeaderLogo />
                    <HeaderNav currentPath={currentPath} />

                    <div className={styles["header__actions"]}>
                        <AiButton onClick={openChat} />
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

            <AiChatModal />
        </>
    );
}
