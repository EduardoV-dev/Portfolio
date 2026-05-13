export type ContentBlock =
    | { type: "paragraph"; text: string }
    | { type: "heading"; level: 2 | 3; text: string }
    | { type: "code"; language: string; snippet: string }
    | { type: "list"; items: string[] }
    | { type: "quote"; text: string; attribution?: string };

export interface Post {
    slug: string;
    title: string;
    description: string;
    date: string;
    readingTime: number;
    tags: string[];
    category: "architecture" | "backend" | "cloud" | "performance";
    featured?: boolean;
    body: ContentBlock[];
}

export function formatPostDate(dateStr: string): string {
    const [year, month, day] = dateStr.split("-").map(Number);

    return new Date(year, month - 1, day).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}
