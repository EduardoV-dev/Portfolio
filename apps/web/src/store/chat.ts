import { create } from "zustand";

export type MessageRole = "assistant" | "user";

export interface Message {
    id: string;
    role: MessageRole;
    text: string;
}

const INITIAL_MESSAGE: Message = {
    id: "init",
    role: "assistant",
    text: "I'm Eduardo's AI assistant. Ask me about his technical experience, projects, or how he approaches system design.",
};

const RESPONSES: Record<string, string> = {
    "what aws services have you used in production":
        "Eduardo has production experience with Lambda, EKS (Kubernetes), S3, CloudFront, RDS, SQS, SNS, and Terraform for IaC. He's worked on migrations from monolithic apps to serverless architectures, contributing to 40% reductions in operational costs.",
    "what's the most complex system you've built":
        "One notable project was the full marketing platform for Now Optics, a nationwide optical retail chain. Eduardo built the entire system using React, Next.js, and Node.js, including high-traffic landing pages, A/B testing infrastructure, and a CI/CD pipeline on AWS that cut deploy times by 60%.",
    "how do you approach system design":
        "Eduardo starts with the business constraint (scale, cost, or latency) and works backward into the architecture. He favors event-driven patterns for async workloads, cloud-native services over custom infrastructure, and instruments observability from day one rather than as a retrofit.",
};

const FALLBACK_RESPONSE =
    "Eduardo has broad experience across full-stack development, cloud infrastructure, and system design. Feel free to ask about a specific project, technology, or how he works.";

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
    "How do you approach system design?",
];

interface ChatState {
    isOpen: boolean;
    messages: Message[];
    pendingPrompt: string | null;
    inlinePendingPrompt: string | null;

    openChat: () => void;
    closeChat: () => void;
    addMessage: (msg: Omit<Message, "id">) => void;
    setPendingPrompt: (prompt: string | null) => void;
    setInlinePendingPrompt: (prompt: string | null) => void;
    resetMessages: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
    isOpen: false,
    messages: [INITIAL_MESSAGE],
    pendingPrompt: null,
    inlinePendingPrompt: null,

    openChat: () => set({ isOpen: true }),
    closeChat: () => set({ isOpen: false }),

    addMessage: (msg) =>
        set((state) => ({
            messages: [
                ...state.messages,
                { ...msg, id: `${msg.role}-${Date.now()}-${Math.random()}` },
            ],
        })),

    setPendingPrompt: (prompt) => set({ pendingPrompt: prompt }),
    setInlinePendingPrompt: (prompt) => set({ inlinePendingPrompt: prompt }),

    resetMessages: () => set({ messages: [INITIAL_MESSAGE] }),
}));
