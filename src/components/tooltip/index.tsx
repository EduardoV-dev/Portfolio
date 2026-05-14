import type { ReactNode } from "react";
import clsx from "clsx";
import styles from "./index.module.css";

interface TooltipProps {
    text: string;
    position?: "top" | "bottom" | "left" | "right";
    className?: string;
    disabled?: boolean;
    children: ReactNode;
}

export default function Tooltip({
    text,
    position = "top",
    className = "",
    disabled = false,
    children,
}: TooltipProps) {
    const containerClasses = clsx(styles["tooltip-container"], className);
    const boxClasses = clsx(styles["tooltip-box"], styles[`tooltip-box--${position}`]);

    return (
        <div className={containerClasses}>
            {children}
            {!disabled && (
                <div className={boxClasses} role="tooltip">
                    <span className={styles["tooltip-text"]}>{text}</span>
                    <div className={styles["tooltip-arrow"]} />
                </div>
            )}
        </div>
    );
}
