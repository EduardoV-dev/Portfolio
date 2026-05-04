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
    text: "I'm Eduardo's AI assistant. Ask me about his experience, projects, or how he approaches building digital products.",
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
