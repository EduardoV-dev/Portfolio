interface LogContext {
    [key: string]: unknown;
}

function getUtcTimestamp(): string {
    return new Date().toISOString();
}

function formatPayload(message: string, context?: LogContext): [string, LogContext?] {
    const prefixedMessage = `[${getUtcTimestamp()}] ${message}`;

    if (!context) {
        return [prefixedMessage];
    }

    return [prefixedMessage, context];
}

export const logger = {
    info(message: string, context?: LogContext) {
        // eslint-disable-next-line no-console
        console.info(...formatPayload(message, context));
    },

    warn(message: string, context?: LogContext) {
        console.warn(...formatPayload(message, context));
    },

    error(message: string, context?: LogContext) {
        console.error(...formatPayload(message, context));
    },
};
