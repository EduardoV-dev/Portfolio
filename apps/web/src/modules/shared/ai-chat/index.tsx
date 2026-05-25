import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import ReactMarkdown from "react-markdown";
import { useChatStore, DEFAULT_PROMPTS } from "@/store/chat";
import styles from "./index.module.css";

interface ChatRequestMessage {
    role: "assistant" | "user";
    content: string;
}

interface ChatErrorResponse {
    message?: string;
}

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
        updateMessage,
        setPendingPrompt,
        setInlinePendingPrompt,
        clearChatHistory,
    } = useChatStore();
    const [input, setInput] = useState("");
    const [isStreaming, setIsStreaming] = useState(false);
    const [isConfirmingClear, setIsConfirmingClear] = useState(false);
    const [showClearedToast, setShowClearedToast] = useState(false);
    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const clearToastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const hasUserMessages = messages.some((m) => m.role === "user");
    const canClearChat = messages.length > 1 || hasUserMessages;

    // Auto-scroll to bottom on new messages — scoped to the messages container only
    useEffect(() => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    }, [messages, isStreaming]);

    // Consume pendingPrompt — only in popup mode to avoid double-submission
    useEffect(() => {
        if (!pendingPrompt || mode !== "popup") return;
        setPendingPrompt(null);
        void submitMessage(pendingPrompt);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pendingPrompt]);

    // Consume inlinePendingPrompt — only in inline mode
    useEffect(() => {
        if (!inlinePendingPrompt || mode !== "inline") return;
        setInlinePendingPrompt(null);
        void submitMessage(inlinePendingPrompt);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inlinePendingPrompt]);

    useEffect(() => {
        return () => {
            if (clearToastTimerRef.current) {
                clearTimeout(clearToastTimerRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (!canClearChat && isConfirmingClear) {
            setIsConfirmingClear(false);
        }
    }, [canClearChat, isConfirmingClear]);

    async function submitMessage(rawText: string) {
        const text = rawText.trim();
        if (!text || isStreaming) {
            return;
        }

        const messagesForRequest: ChatRequestMessage[] = [
            ...messages.map((message) => ({ role: message.role, content: message.text })),
            { role: "user", content: text },
        ];

        addMessage({ role: "user", text });
        const assistantMessageId = addMessage({ role: "assistant", text: "" });
        setInput("");
        setIsStreaming(true);

        try {
            const response = await fetch("/api/ai-chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ messages: messagesForRequest }),
            });

            if (!response.ok || !response.body) {
                let backendMessage = "";
                const contentType = response.headers.get("content-type") || "";

                if (contentType.includes("application/json")) {
                    const errorPayload = (await response.json()) as ChatErrorResponse;
                    backendMessage = errorPayload.message || "";
                }

                const statusMessage = `Chat request failed with status ${response.status}`;
                throw new Error(backendMessage || statusMessage);
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let assistantText = "";

            while (true) {
                const { done, value } = await reader.read();
                if (done) {
                    break;
                }

                assistantText += decoder.decode(value, { stream: true });
                updateMessage(assistantMessageId, assistantText);
            }

            assistantText += decoder.decode();
            updateMessage(assistantMessageId, assistantText.trim());
        } catch (error) {
            const fallbackMessage =
                "Sorry, I hit an issue while generating response. Please try again.";
            const errorMessage = error instanceof Error ? error.message : fallbackMessage;
            updateMessage(assistantMessageId, errorMessage || fallbackMessage);
        } finally {
            setIsStreaming(false);
        }
    }

    function handleSend() {
        if (!input.trim()) {
            return;
        }

        void submitMessage(input);
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    }

    function handlePromptClick(prompt: string) {
        if (!prompt.trim()) {
            return;
        }

        void submitMessage(prompt);
    }

    function handleClearClick() {
        if (!canClearChat || isStreaming) {
            return;
        }

        if (!isConfirmingClear) {
            setIsConfirmingClear(true);
            return;
        }

        clearChatHistory();
        setInput("");
        setIsConfirmingClear(false);
        setShowClearedToast(true);
        if (clearToastTimerRef.current) {
            clearTimeout(clearToastTimerRef.current);
        }
        clearToastTimerRef.current = setTimeout(() => {
            setShowClearedToast(false);
        }, 1800);
        inputRef.current?.focus();
    }

    function handleCancelClear() {
        setIsConfirmingClear(false);
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
                            <p className={styles.chatStatus}>STATUS: ONLINE</p>
                        </div>
                    </div>
                    <div className={styles.chatHeaderRight}>
                        {canClearChat && (
                            <button
                                className={styles.resetBtn}
                                onClick={handleClearClick}
                                aria-label="New conversation"
                                title={isConfirmingClear ? "Confirm clear chat" : "Clear chat"}
                                type="button"
                                disabled={isStreaming}
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
                        {isConfirmingClear && (
                            <>
                                <button
                                    className={styles.confirmBtn}
                                    onClick={handleClearClick}
                                    aria-label="Confirm clear chat"
                                    title="Confirm clear chat"
                                    type="button"
                                >
                                    Clear
                                </button>
                                <button
                                    className={styles.cancelBtn}
                                    onClick={handleCancelClear}
                                    aria-label="Cancel clear chat"
                                    title="Cancel"
                                    type="button"
                                >
                                    Cancel
                                </button>
                            </>
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
                                    {msg.text ? (
                                        <div className={styles.markdown}>
                                            <ReactMarkdown>{msg.text}</ReactMarkdown>
                                        </div>
                                    ) : (
                                        isStreaming && (
                                            <span className={styles.typingDots}>
                                                <span />
                                                <span />
                                                <span />
                                            </span>
                                        )
                                    )}
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
            </div>

            {mode === "inline" && canClearChat && (
                <div className={styles.inlineActions}>
                    {!isConfirmingClear && (
                        <button
                            className={styles.inlineClearBtn}
                            onClick={handleClearClick}
                            type="button"
                            disabled={isStreaming}
                        >
                            Clear chat history
                        </button>
                    )}
                    {isConfirmingClear && (
                        <>
                            <span className={styles.inlineConfirmText}>
                                Clear saved chat history on this browser?
                            </span>
                            <button
                                className={styles.inlineConfirmBtn}
                                onClick={handleClearClick}
                                type="button"
                            >
                                Clear
                            </button>
                            <button
                                className={styles.inlineCancelBtn}
                                onClick={handleCancelClear}
                                type="button"
                            >
                                Cancel
                            </button>
                        </>
                    )}
                </div>
            )}

            {showClearedToast && <p className={styles.clearedToast}>Chat history cleared</p>}

            {/* Suggested prompts — shown until first user message */}
            {!hasUserMessages && (
                <div className={styles.prompts}>
                    <p className={styles.promptsLabel}>START WITH:</p>
                    <div className={styles.promptsList}>
                        {DEFAULT_PROMPTS.map((prompt) => (
                            <button
                                key={prompt}
                                className={styles.promptBtn}
                                onClick={() => handlePromptClick(prompt)}
                                type="button"
                                disabled={isStreaming}
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
                    placeholder="Ask about Eduardo's experience…"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    aria-label="Chat input"
                    disabled={isStreaming}
                />
                <button
                    className={styles.sendBtn}
                    onClick={handleSend}
                    disabled={isStreaming || !input.trim()}
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
