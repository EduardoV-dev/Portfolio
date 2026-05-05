import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { useChatStore, DEFAULT_PROMPTS } from "@/store/chat";
import styles from "./index.module.css";

interface AiChatProps {
    mode?: "inline" | "popup";
    onClose?: () => void;
}

export default function AiChat({ mode = "inline", onClose }: AiChatProps) {
    const {
        messages,
        pendingPrompt,
        inlinePendingPrompt,
        addMessage,
        setPendingPrompt,
        setInlinePendingPrompt,
        resetMessages,
    } = useChatStore();
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const hasUserMessages = messages.some((m) => m.role === "user");

    // Auto-scroll to bottom on new messages — scoped to the messages container only
    useEffect(() => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    // Consume pendingPrompt — only in popup mode to avoid double-submission
    useEffect(() => {
        if (!pendingPrompt || mode !== "popup") return;
        const prompt = pendingPrompt;
        setPendingPrompt(null);
        submitMessage(prompt);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pendingPrompt]);

    // Consume inlinePendingPrompt — only in inline mode
    useEffect(() => {
        if (!inlinePendingPrompt || mode !== "inline") return;
        const prompt = inlinePendingPrompt;
        setInlinePendingPrompt(null);
        submitMessage(prompt);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inlinePendingPrompt]);

    function submitMessage(_text: string) {
        // LLM integration coming soon — submissions disabled
        return;
    }

    function handleSend() {
        submitMessage(input);
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    }

    function handlePromptClick(prompt: string) {
        submitMessage(prompt);
    }

    return (
        <div className={clsx(styles.chat, styles[`chat--${mode}`])}>
            {/* Popup header bar */}
            {mode === "popup" && (
                <div className={styles.chatHeader}>
                    <div className={styles.chatHeaderLeft}>
                        <span className={styles.onlineDot} aria-hidden="true" />
                        <div>
                            <p className={styles.chatTitle}>
                                Eduardo&apos;s AI Engineering Assistant
                            </p>
                            <p className={styles.chatStatus}>STATUS: COMING SOON</p>
                        </div>
                    </div>
                    <div className={styles.chatHeaderRight}>
                        {hasUserMessages && (
                            <button
                                className={styles.resetBtn}
                                onClick={resetMessages}
                                aria-label="New conversation"
                                title="New conversation"
                                type="button"
                            >
                                <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    aria-hidden="true"
                                >
                                    <path
                                        d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M3 3v5h5"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                        )}
                        <button
                            className={styles.closeBtn}
                            onClick={onClose}
                            aria-label="Close chat"
                            type="button"
                        >
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 20 20"
                                fill="none"
                                aria-hidden="true"
                            >
                                <path
                                    d="M15 5L5 15M5 5L15 15"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            )}

            {/* Messages area */}
            <div
                className={styles.messages}
                ref={messagesContainerRef}
                aria-live="polite"
                aria-label="Chat messages"
            >
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={clsx(styles.messageRow, styles[`messageRow--${msg.role}`])}
                    >
                        {msg.role === "assistant" && (
                            <div className={styles.messageGroup}>
                                <div className={styles.roleLabel}>
                                    <div className={styles.avatarIcon} aria-hidden="true">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                            <path
                                                d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
                                                fill="var(--color-accent)"
                                                stroke="var(--color-accent)"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </div>
                                    <span className={styles.roleName}>ASSISTANT</span>
                                </div>
                                <div className={clsx(styles.bubble, styles["bubble--assistant"])}>
                                    {msg.text}
                                </div>
                            </div>
                        )}

                        {msg.role === "user" && (
                            <div className={styles.messageGroup}>
                                <div className={clsx(styles.roleLabel, styles["roleLabel--user"])}>
                                    <span className={styles.roleName}>YOU</span>
                                    <div className={styles.avatarIcon} aria-hidden="true">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                            <circle
                                                cx="12"
                                                cy="8"
                                                r="4"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                            />
                                            <path
                                                d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <div className={clsx(styles.bubble, styles["bubble--user"])}>
                                    {msg.text}
                                </div>
                            </div>
                        )}
                    </div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                    <div className={clsx(styles.messageRow, styles["messageRow--assistant"])}>
                        <div className={styles.messageGroup}>
                            <div className={styles.roleLabel}>
                                <div className={styles.avatarIcon} aria-hidden="true">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                        <path
                                            d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
                                            fill="var(--color-accent)"
                                            stroke="var(--color-accent)"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                                <span className={styles.roleName}>ASSISTANT</span>
                            </div>
                            <div className={clsx(styles.bubble, styles["bubble--assistant"])}>
                                <span className={styles.typingDots}>
                                    <span />
                                    <span />
                                    <span />
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Suggested prompts — shown until first user message; disabled until LLM is live */}
            {!hasUserMessages && (
                <div className={styles.prompts}>
                    <p className={styles.promptsLabel}>COMING SOON</p>
                    <div className={styles.promptsList}>
                        {DEFAULT_PROMPTS.map((prompt) => (
                            <button
                                key={prompt}
                                className={styles.promptBtn}
                                onClick={() => handlePromptClick(prompt)}
                                type="button"
                                disabled
                            >
                                {prompt}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Input bar */}
            <div className={styles.inputBar}>
                <input
                    ref={inputRef}
                    className={styles.input}
                    type="text"
                    placeholder="Chat coming soon…"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    aria-label="Chat input"
                    disabled
                />
                <button
                    className={styles.sendBtn}
                    onClick={handleSend}
                    disabled
                    aria-label="Send message"
                    type="button"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path
                            d="M5 12h14M13 6l6 6-6 6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
}
