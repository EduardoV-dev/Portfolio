import clsx from "clsx";
import styles from "./index.module.css";

interface HeaderCtaProps {
    className?: string;
    id?: string;
    mobile?: boolean;
}

export default function HeaderCta({ className = "", id, mobile = false }: HeaderCtaProps) {
    const classes = clsx(styles["cta-btn"], mobile && styles["cta-btn--mobile"], className);

    return (
        <a href="/schedule" className={classes} id={id}>
            SCHEDULE A CALL
        </a>
    );
}
