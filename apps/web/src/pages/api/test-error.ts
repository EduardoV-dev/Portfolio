import * as Sentry from "@sentry/astro";

export const prerender = false;

export async function GET() {
    try {
        throw new Error("Sentry Example API Route Error");
    } catch (error) {
        Sentry.captureException(error);
        await Sentry.flush(2000);

        return new Response("Sentry Example API Route Error", {
            status: 500,
        });
    }
}
