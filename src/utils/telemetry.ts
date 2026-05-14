type GtagParams = Record<string, string | number | boolean | null | undefined>;

type GtagFunction = {
    (command: "event", eventName: string, params?: GtagParams): void;
    (command: "config", targetId: string, params?: GtagParams): void;
    (command: "js", config: Date): void;
};

declare global {
    interface Window {
        dataLayer: unknown[];
        gtag?: GtagFunction;
    }
}

function hasGtag(): boolean {
    return typeof window !== "undefined" && typeof window.gtag === "function";
}

export function isAnalyticsEnabled(): boolean {
    return hasGtag();
}

export function trackEvent(eventName: string, params?: GtagParams): void {
    if (!hasGtag()) {
        return;
    }

    window.gtag?.("event", eventName, params);
}
