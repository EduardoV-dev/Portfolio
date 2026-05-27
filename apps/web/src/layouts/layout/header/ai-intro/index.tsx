import { useEffect, useState } from "react";
import styles from "./index.module.css";

interface AiIntroProps {
    onAskAi: () => void;
    onDismiss: () => void;
    variant: "desktop" | "mobile";
    isClosing?: boolean;
}

export default function AiIntro({ onAskAi, onDismiss, variant, isClosing = false }: AiIntroProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const frameId = window.requestAnimationFrame(() => {
            setIsVisible(true);
        });

        return () => {
            window.cancelAnimationFrame(frameId);
        };
    }, []);

    const containerClass = variant === "desktop" ? styles.desktopIntro : styles.mobileIntro;
    const copy =
        variant === "desktop"
            ? "Short on time? Ask AI for quick answers about projects, stack, and architecture."
            : "Need quick info? Open AI chat and ask about experience, projects, or stack.";

    return (
        <div
            className={`${containerClass} ${isVisible ? styles.introVisible : ""} ${isClosing ? styles.introClosing : ""}`}
            role="status"
            aria-live="polite"
        >
            <p className={styles.copy}>{copy}</p>
            <div className={styles.actions}>
                <button className={styles.askBtn} onClick={onAskAi} type="button">
                    Ask AI
                </button>
                <button className={styles.dismissBtn} onClick={onDismiss} type="button">
                    Dismiss
                </button>
            </div>
        </div>
    );
}
