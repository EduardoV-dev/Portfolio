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
    text: "Hello! I'm an AI representation of the engineer. I can share details about technical stack, past projects, or cloud expertise. How can I help you today?",
};

const RESPONSES: Record<string, string> = {
    "explain your aws experience":
        "The engineer has 5+ years of experience with AWS, focusing on EKS (Kubernetes), Lambda, and Terraform for Infrastructure as Code. They have led migrations of monolithic apps to serverless architectures, reducing operational costs by 40%.",
    "tell me about now optics project":
        "Now Optics is a nationwide optical retail chain. The engineer built their full marketing platform using React, Next.js, and Node.js — including high-traffic landing pages, A/B testing infrastructure, and a CI/CD pipeline on AWS that reduced deploy times by 60%.",
    "what backend stacks have you used?":
        "The engineer has worked extensively with Node.js (Express, Fastify), Go, and PostgreSQL. They've built REST and GraphQL APIs, event-driven systems with AWS SQS/SNS, and real-time features with WebSockets.",
};

const FALLBACK_RESPONSE =
    "That's a great question. The engineer has broad experience across full-stack development, cloud infrastructure, and system design. Feel free to ask about a specific project or technology!";

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
    '"Explain your AWS experience"',
    '"Tell me about Now Optics project"',
    '"What backend stacks have you used?"',
];

interface ChatState {
    isOpen: boolean;
    messages: Message[];
    pendingPrompt: string | null;

    openChat: () => void;
    closeChat: () => void;
    addMessage: (msg: Omit<Message, "id">) => void;
    setPendingPrompt: (prompt: string | null) => void;
    resetMessages: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
    isOpen: false,
    messages: [INITIAL_MESSAGE],
    pendingPrompt: null,

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

    resetMessages: () => set({ messages: [INITIAL_MESSAGE] }),
}));
