import { useCallback, useEffect, useRef, useState } from "react";
import { useChatStore } from "@/store/chat";
import AiIntro from "./ai-intro";
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

const INTRO_EXIT_DURATION_MS = 180;

export default function Header({ currentPath }: HeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const {
        isOpen: isChatOpen,
        hasHydrated,
        hasSeenAiIntro,
        openChat,
        closeChat,
        markAiIntroSeen,
    } = useChatStore();
    const lastFocusedElementRef = useRef<HTMLElement | null>(null);
    const [introAction, setIntroAction] = useState<"none" | "ask" | "dismiss">("none");

    const shouldShowAiIntro = hasHydrated && !hasSeenAiIntro && !isChatOpen && !isMenuOpen;
    const shouldRenderAiIntro = shouldShowAiIntro || introAction !== "none";

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

    const handleAskAiFromIntro = useCallback(() => {
        setIntroAction("ask");
    }, []);

    const handleDismissAiIntro = useCallback(() => {
        setIntroAction("dismiss");
    }, []);

    useEffect(() => {
        if (introAction === "none") {
            return;
        }

        const timerId = window.setTimeout(() => {
            markAiIntroSeen();
            if (introAction === "ask") {
                openChat();
            }
            setIntroAction("none");
        }, INTRO_EXIT_DURATION_MS);

        return () => {
            window.clearTimeout(timerId);
        };
    }, [introAction, markAiIntroSeen, openChat]);

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
                        <div className={styles["header__ai"]}>
                            <AiButton onClick={handleOpenChat} />
                            {shouldRenderAiIntro && (
                                <AiIntro
                                    variant="desktop"
                                    isClosing={introAction !== "none"}
                                    onAskAi={handleAskAiFromIntro}
                                    onDismiss={handleDismissAiIntro}
                                />
                            )}
                        </div>
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

            {shouldRenderAiIntro && (
                <AiIntro
                    variant="mobile"
                    isClosing={introAction !== "none"}
                    onAskAi={handleAskAiFromIntro}
                    onDismiss={handleDismissAiIntro}
                />
            )}
        </>
    );
}
