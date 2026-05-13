import clsx from "clsx";
import { HEADER_NAV_ITEMS } from "@/constants/routes";
import styles from "./index.module.css";

interface HeaderNavProps {
    currentPath: string;
}

export default function HeaderNav({ currentPath }: HeaderNavProps) {
    return (
        <nav className={styles.nav} aria-label="Main navigation">
            <ul className={styles["nav__list"]}>
                {HEADER_NAV_ITEMS.map(({ label, href }) => {
                    const isActive = currentPath.startsWith(href);

                    return (
                        <li key={href}>
                            <a
                                href={href}
                                className={clsx(styles["nav__link"], {
                                    [styles["nav__link--active"]]: isActive,
                                })}
                                aria-current={isActive ? "page" : undefined}
                            >
                                {label}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
