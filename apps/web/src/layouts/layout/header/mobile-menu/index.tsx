import clsx from "clsx";
import { HEADER_NAV_ITEMS } from "@/constants/routes";
import { useChatStore } from "@/store/chat";
import AiButton from "../ai-button";
import HeaderCta from "../header-cta";
import HeaderLogo from "../header-logo";
import styles from "./index.module.css";

interface MobileMenuProps {
    currentPath: string;
    isOpen: boolean;
    onClose: () => void;
}

export default function MobileMenu({ currentPath, isOpen, onClose }: MobileMenuProps) {
    const { openChat } = useChatStore();

    function handleAiClick() {
        onClose();
        openChat();
    }
    return (
        <>
            <div
                className={styles["mobile-menu"]}
                id="mobile-menu"
                role="dialog"
                aria-modal="true"
                aria-label="Mobile navigation"
                hidden={!isOpen}
            >
                <div className={styles["mobile-menu__header"]}>
                    <HeaderLogo />
                    <button
                        className={styles["close-btn"]}
                        id="close-menu-btn"
                        aria-label="Close menu"
                        onClick={onClose}
                        type="button"
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                        >
                            <path
                                d="M15 5L5 15M5 5L15 15"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                            ></path>
                        </svg>
                    </button>
                </div>

                <nav className={styles["mobile-nav"]} aria-label="Mobile navigation">
                    <ul className={styles["mobile-nav__list"]}>
                        {HEADER_NAV_ITEMS.map(({ label, href }) => (
                            <li
                                key={href}
                                className={clsx(styles["mobile-nav__item"], {
                                    [styles["mobile-nav__item--active"]]:
                                        currentPath.startsWith(href),
                                })}
                            >
                                <a
                                    href={href}
                                    className={styles["mobile-nav__link"]}
                                    onClick={onClose}
                                >
                                    {label}
                                </a>
                            </li>
                        ))}
                    </ul>

                    <div className={styles["mobile-actions"]}>
                        <AiButton
                            className={styles["mobile-actions__ai"]}
                            onClick={handleAiClick}
                        />
                        <HeaderCta mobile />
                    </div>
                </nav>
            </div>

            <button
                className={styles["mobile-backdrop"]}
                id="mobile-backdrop"
                hidden={!isOpen}
                onClick={onClose}
                type="button"
                aria-label="Close mobile menu"
            />
        </>
    );
}
