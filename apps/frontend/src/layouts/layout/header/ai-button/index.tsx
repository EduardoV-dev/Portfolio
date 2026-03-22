import Tooltip from "@/components/tooltip/index";
import styles from "./index.module.css";

interface AiButtonProps {
    className?: string;
    onClick?: () => void;
}

export default function AiButton({ className = "", onClick }: AiButtonProps) {
    return (
        <Tooltip
            text="🔍 Explore my experience with AI (Ctrl + K)"
            position="bottom"
            className={className}
        >
            <button
                className={styles["ai-button"]}
                aria-label="Explore AI experience"
                type="button"
                onClick={onClick}
            >
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    focusable="false"
                >
                    <title>AI sparkle icon</title>
                    <path
                        d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
                        fill="var(--color-ai-sparkle, #FFD700)"
                        stroke="var(--color-ai-sparkle, #FFD700)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M18 16L18.8 18.5L21 19.3L18.8 20.1L18 22.6L17.2 20.1L15 19.3L17.2 18.5L18 16Z"
                        fill="var(--color-ai-sparkle, #FFD700)"
                        stroke="var(--color-ai-sparkle, #FFD700)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>
        </Tooltip>
    );
}
