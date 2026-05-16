import { type APIRoute } from "astro";

export const prerender = false;

type ReadMode = "none" | "text" | "buffer" | "dsn";

function getReadMode(request: Request): ReadMode {
    const rawMode = request.headers.get("x-debug-read-mode");

    if (rawMode === "text" || rawMode === "buffer" || rawMode === "dsn") {
        return rawMode;
    }

    return "none";
}

export const POST: APIRoute = async ({ request }) => {
    const mode = getReadMode(request);
    const responseData: {
        ok: boolean;
        mode: ReadMode;
        contentType: string | null;
        length?: number;
        dsnHost?: string;
        dsnProjectId?: string;
    } = {
        ok: true,
        mode,
        contentType: request.headers.get("content-type"),
    };

    try {
        if (mode === "text") {
            const text = await request.text();
            responseData.length = text.length;
        }

        if (mode === "buffer") {
            const buffer = await request.arrayBuffer();
            responseData.length = buffer.byteLength;
        }

        if (mode === "dsn") {
            const dsn = import.meta.env.PUBLIC_SENTRY_DSN;

            if (dsn) {
                const dsnUrl = new URL(dsn);
                const pathnameParts = dsnUrl.pathname.split("/").filter(Boolean);
                responseData.dsnHost = dsnUrl.hostname;
                responseData.dsnProjectId = pathnameParts[pathnameParts.length - 1] || "";
            }
        }

        return new Response(JSON.stringify(responseData), {
            status: 200,
            headers: {
                "content-type": "application/json",
                "x-post-echo": "ok",
            },
        });
    } catch (error) {
        return new Response(
            JSON.stringify({
                ok: false,
                mode,
                error: error instanceof Error ? error.message : "unknown-error",
            }),
            {
                status: 500,
                headers: {
                    "content-type": "application/json",
                    "x-post-echo": "error",
                },
            },
        );
    }
};
