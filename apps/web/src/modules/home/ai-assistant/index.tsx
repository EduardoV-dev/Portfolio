import { useChatStore, DEFAULT_PROMPTS } from "@/store/chat";
import AiChat from "@/modules/shared/ai-chat/index";
import styles from "./index.module.css";

export default function AiAssistantSection() {
    const { setInlinePendingPrompt } = useChatStore();

    function handlePromptClick(prompt: string) {
        setInlinePendingPrompt(prompt);
    }

    return (
        <section className={styles.section} aria-labelledby="ai-heading">
            <div className={styles.inner}>
                <div className={styles.card}>
                    {/* Left column */}
                    <div className={styles.left}>
                        <h2 className={styles.heading} id="ai-heading">
                            Ask Me Anything
                        </h2>
                        <p className={styles.description}>
                            Short on time? Ask directly about my stack, past systems, or how I work.
                            Trained on my real project history.
                        </p>

                        {/* External suggested prompts — desktop only */}
                        <div className={styles.externalPrompts}>
                            <p className={styles.externalPromptsLabel}>SUGGESTED PROMPTS</p>
                            <div className={styles.externalPromptsList}>
                                {DEFAULT_PROMPTS.map((prompt) => (
                                    <button
                                        key={prompt}
                                        className={styles.externalPromptBtn}
                                        onClick={() => handlePromptClick(prompt)}
                                        type="button"
                                    >
                                        {prompt}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right column — inline chat */}
                    <div className={styles.right}>
                        <div className={styles.chatWrap}>
                            <AiChat mode="inline" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
