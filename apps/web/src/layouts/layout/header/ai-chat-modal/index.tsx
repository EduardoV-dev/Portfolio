import { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { useChatStore } from "@/store/chat";
import AiChat from "@/modules/shared/ai-chat/index";
import styles from "./index.module.css";

const CLOSE_DURATION = 160;

export default function AiChatModal() {
    const { isOpen, closeChat } = useChatStore();
    const [isClosing, setIsClosing] = useState(false);
    const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Cleanup timer on unmount
    useEffect(() => {
        return () => {
            if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
        };
    }, []);

    const handleClose = useCallback(() => {
        setIsClosing(true);
        closeTimerRef.current = setTimeout(() => {
            closeChat();
            setIsClosing(false);
        }, CLOSE_DURATION);
    }, [closeChat]);

    // Close on Escape
    useEffect(() => {
        function onKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape" && isOpen) handleClose();
        }
        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [isOpen, handleClose]);

    return (
        <>
            {/* Backdrop */}
            <button
                className={clsx(styles.backdrop, isClosing && styles["backdrop--closing"])}
                hidden={!isOpen && !isClosing}
                onClick={handleClose}
                aria-label="Close AI chat"
                type="button"
            />

            {/* Modal panel */}
            <div
                className={clsx(styles.modal, isClosing && styles["modal--closing"])}
                hidden={!isOpen && !isClosing}
                role="dialog"
                aria-modal="true"
                aria-label="AI Engineering Assistant"
            >
                <AiChat mode="popup" onClose={handleClose} />
            </div>
        </>
    );
}
