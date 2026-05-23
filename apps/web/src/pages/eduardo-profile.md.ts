import { myProfileServices } from "@/api/my-profile";

export const prerender = true;

export async function GET() {
    const systemPrompt = await myProfileServices.findSystemPrompt();

    return new Response(systemPrompt, {
        headers: {
            "Content-Type": "text/markdown; charset=utf-8",
        },
    });
}
