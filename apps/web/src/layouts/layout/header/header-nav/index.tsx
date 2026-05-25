import clsx from "clsx";
import { APP_ROUTES, HEADER_NAV_ITEMS } from "@/constants/routes";
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
                {!HEADER_NAV_ITEMS.some(({ href }) => href === APP_ROUTES.BLOG.ROOT) && (
                    <li>
                        <a
                            href={APP_ROUTES.BLOG.ROOT}
                            className={clsx(styles["nav__link"], {
                                [styles["nav__link--active"]]: currentPath.startsWith(
                                    APP_ROUTES.BLOG.ROOT,
                                ),
                            })}
                            aria-current={
                                currentPath.startsWith(APP_ROUTES.BLOG.ROOT) ? "page" : undefined
                            }
                        >
                            Blog
                        </a>
                    </li>
                )}
            </ul>
        </nav>
    );
}
