import { useEffect } from "react";
import { useChatStore } from "@/store/chat";
import AiChat from "@/modules/shared/ai-chat/index";
import styles from "./index.module.css";

export default function AiChatModal() {
    const { isOpen, closeChat } = useChatStore();

    // Close on Escape
    useEffect(() => {
        function onKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape" && isOpen) closeChat();
        }
        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [isOpen, closeChat]);

    return (
        <>
            {/* Backdrop */}
            <button
                className={styles.backdrop}
                hidden={!isOpen}
                onClick={closeChat}
                aria-label="Close AI chat"
                type="button"
            />

            {/* Modal panel */}
            <div
                className={styles.modal}
                hidden={!isOpen}
                role="dialog"
                aria-modal="true"
                aria-label="AI Engineering Assistant"
            >
                <AiChat mode="popup" onClose={closeChat} />
            </div>
        </>
    );
}
