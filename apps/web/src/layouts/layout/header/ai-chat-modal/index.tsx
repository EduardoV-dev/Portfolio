import { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { useChatStore } from "@/store/chat";
import AiChat from "@/modules/shared/ai-chat/index";
import styles from "./index.module.css";

const CLOSE_DURATION = 160;

interface AiChatModalProps {
    onRestoreFocus?: () => void;
}

export default function AiChatModal({ onRestoreFocus }: AiChatModalProps) {
    const { isOpen, closeChat } = useChatStore();
    const [isClosing, setIsClosing] = useState(false);
    const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const wasOpenRef = useRef(false);

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

    useEffect(() => {
        if (!isOpen || !modalRef.current) {
            return;
        }

        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );

        focusableElements[0]?.focus();

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key !== "Tab" || !modalRef.current) {
                return;
            }

            const elements = modalRef.current.querySelectorAll<HTMLElement>(
                'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
            );

            if (elements.length === 0) {
                return;
            }

            const firstElement = elements[0];
            const lastElement = elements[elements.length - 1];
            const activeElement = document.activeElement;

            if (event.shiftKey && activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
                return;
            }

            if (!event.shiftKey && activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus();
            }
        }

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            wasOpenRef.current = true;
            return;
        }

        if (wasOpenRef.current && !isClosing) {
            onRestoreFocus?.();
            wasOpenRef.current = false;
        }
    }, [isOpen, isClosing, onRestoreFocus]);

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
                ref={modalRef}
            >
                <AiChat mode="popup" onClose={handleClose} />
            </div>
        </>
    );
}
