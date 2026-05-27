import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type MessageRole = "assistant" | "user";

export interface Message {
    id: string;
    role: MessageRole;
    text: string;
}

const CHAT_STORAGE_KEY = "eduardov-ai-chat";
const CHAT_HISTORY_TTL_MS = 7 * 24 * 60 * 60 * 1000;

function createMessageId(role: MessageRole): string {
    return `${role}-${Date.now()}-${Math.random()}`;
}

const INITIAL_MESSAGE: Message = {
    id: "init",
    role: "assistant",
    text: "Ask about Eduardo's projects, architecture decisions, and real-world engineering experience.",
};

const RESPONSES: Record<string, string> = {
    "what aws services have you used in production":
        "Eduardo has production experience with EC2, App Runner, Lambda, S3, CloudFront, Route 53, RDS, API Gateway, IAM, and CodeBuild. He's partnered with DevOps teams on deployment workflows to maintain reliable releases and stable website performance.",
    "what's the most complex system you've built":
        "One standout project was architecting a tailored headless CMS at Now Optics to streamline content operations for the Marketing team. Eduardo led the design and planning, collaborating with stakeholders and engineers to align technical direction, implementation priorities, and usability requirements.",
    "how do you approach system design":
        "Eduardo starts with the business or product constraint, conversion goals, content flexibility, performance budgets, and works backward into the architecture. He bridges engineering, product, and marketing teams to ensure technical decisions map directly to user needs and business outcomes.",
    "what tech stack do you use":
        "Eduardo's core stack is React, Next.js, Svelte, and Astro on the frontend; Node.js, Express, NestJS, and Go on the backend; PostgreSQL, MySQL, and MongoDB for data; and AWS (EC2, Lambda, S3, CloudFront, RDS) for infrastructure. He also works with GraphQL, gRPC, Docker, Jest, and Cypress.",
};

const FALLBACK_RESPONSE =
    "Eduardo has broad experience across full-stack development, cloud infrastructure, and product-focused engineering. Feel free to ask about a specific project, technology, or how he works.";

export function getSimulatedResponse(input: string): string {
    const key = input.trim().toLowerCase().replace(/^"|"$/g, "");
    for (const [pattern, response] of Object.entries(RESPONSES)) {
        if (key.includes(pattern) || pattern.includes(key)) {
            return response;
        }
    }
    return FALLBACK_RESPONSE;
}

export const DEFAULT_PROMPTS = [
    "What AWS services have you used in production?",
    "What's the most complex system you've built?",
    "What tech stack do you use?",
];

interface ChatState {
    hasHydrated: boolean;
    isOpen: boolean;
    hasSeenAiIntro: boolean;
    messages: Message[];
    pendingPrompt: string | null;
    inlinePendingPrompt: string | null;

    openChat: () => void;
    closeChat: () => void;
    markAiIntroSeen: () => void;
    addMessage: (msg: Omit<Message, "id">) => string;
    updateMessage: (id: string, text: string) => void;
    replaceMessages: (messages: Message[]) => void;
    setPendingPrompt: (prompt: string | null) => void;
    setInlinePendingPrompt: (prompt: string | null) => void;
    resetMessages: () => void;
    clearChatHistory: () => void;
    lastUpdatedAt: number;
}

export const useChatStore = create<ChatState>()(
    persist(
        (set) => ({
            isOpen: false,
            hasHydrated: false,
            hasSeenAiIntro: false,
            messages: [INITIAL_MESSAGE],
            pendingPrompt: null,
            inlinePendingPrompt: null,
            lastUpdatedAt: Date.now(),

            openChat: () => set({ isOpen: true }),
            closeChat: () => set({ isOpen: false }),
            markAiIntroSeen: () => set({ hasSeenAiIntro: true }),

            addMessage: (msg) => {
                const id = createMessageId(msg.role);
                set((state) => ({
                    messages: [...state.messages, { ...msg, id }],
                    lastUpdatedAt: Date.now(),
                }));
                return id;
            },

            updateMessage: (id, text) =>
                set((state) => ({
                    messages: state.messages.map((message) =>
                        message.id === id ? { ...message, text } : message,
                    ),
                    lastUpdatedAt: Date.now(),
                })),

            replaceMessages: (messages) => set({ messages, lastUpdatedAt: Date.now() }),

            setPendingPrompt: (prompt) => set({ pendingPrompt: prompt, lastUpdatedAt: Date.now() }),
            setInlinePendingPrompt: (prompt) =>
                set({ inlinePendingPrompt: prompt, lastUpdatedAt: Date.now() }),

            resetMessages: () => set({ messages: [INITIAL_MESSAGE], lastUpdatedAt: Date.now() }),

            clearChatHistory: () => {
                localStorage.removeItem(CHAT_STORAGE_KEY);
                set({
                    messages: [INITIAL_MESSAGE],
                    pendingPrompt: null,
                    inlinePendingPrompt: null,
                    lastUpdatedAt: Date.now(),
                });
            },
        }),
        {
            name: CHAT_STORAGE_KEY,
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                hasSeenAiIntro: state.hasSeenAiIntro,
                messages: state.messages,
                pendingPrompt: state.pendingPrompt,
                inlinePendingPrompt: state.inlinePendingPrompt,
                lastUpdatedAt: state.lastUpdatedAt,
            }),
            onRehydrateStorage: () => (state) => {
                if (!state) {
                    return;
                }

                state.hasHydrated = true;

                const isExpired = Date.now() - state.lastUpdatedAt > CHAT_HISTORY_TTL_MS;
                if (isExpired) {
                    state.clearChatHistory();
                }
            },
        },
    ),
);
