import clsx from "clsx";
import { routes } from "@/constants/routes";
import styles from "./index.module.css";

interface HeaderNavProps {
    currentPath: string;
}

export default function HeaderNav({ currentPath }: HeaderNavProps) {
    return (
        <nav className={styles.nav} aria-label="Main navigation">
            <ul className={styles["nav__list"]}>
                {routes.map(({ label, href }) => (
                    <li key={href}>
                        <a
                            href={href}
                            className={clsx(styles["nav__link"], {
                                [styles["nav__link--active"]]: currentPath.startsWith(href),
                            })}
                        >
                            {label}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
