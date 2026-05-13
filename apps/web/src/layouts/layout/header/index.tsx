import { useCallback, useEffect, useRef, useState } from "react";
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
    const lastFocusedElementRef = useRef<HTMLElement | null>(null);

    const restoreFocus = useCallback(() => {
        lastFocusedElementRef.current?.focus();
    }, []);

    const handleOpenMenu = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        lastFocusedElementRef.current = event.currentTarget;
        setIsMenuOpen(true);
    }, []);

    const handleOpenChat = useCallback(
        (event?: React.MouseEvent<HTMLButtonElement>) => {
            if (event) {
                lastFocusedElementRef.current = event.currentTarget;
            } else if (document.activeElement instanceof HTMLElement) {
                lastFocusedElementRef.current = document.activeElement;
            }

            openChat();
        },
        [openChat],
    );

    const handleCloseMenu = useCallback(() => {
        setIsMenuOpen(false);
    }, []);

    // Escape closes both menu and chat
    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                handleCloseMenu();
                closeChat();
            }
            // Ctrl+K opens chat
            if ((event.ctrlKey || event.metaKey) && event.key === "k") {
                event.preventDefault();
                handleOpenChat();
            }
        };

        document.addEventListener("keydown", onKeyDown);
        return () => {
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [handleOpenChat, closeChat, handleCloseMenu]);

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
                        <AiButton onClick={handleOpenChat} />
                        <HeaderCta id="cta-desktop" />
                    </div>

                    <button
                        className={styles.hamburger}
                        id="hamburger-btn"
                        aria-label="Open menu"
                        aria-expanded={isMenuOpen}
                        aria-controls="mobile-menu"
                        onClick={handleOpenMenu}
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
                onClose={handleCloseMenu}
                onRestoreFocus={restoreFocus}
            />

            <AiChatModal onRestoreFocus={restoreFocus} />
        </>
    );
}
