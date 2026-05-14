!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{};e.SENTRY_RELEASE={id:"51a973bd64882fbe40a2b1fa1d425937ebce5721"};var n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="22ea8c89-819c-4c83-8a56-15631487500e",e._sentryDebugIdIdentifier="sentry-dbid-22ea8c89-819c-4c83-8a56-15631487500e");}catch(e){}}();import './chunks/astro-designed-error-pages_CCxhuAVH.mjs';
import './chunks/astro/server_BQXoxoT-.mjs';
import 'clsx';
import { s as sequence } from './chunks/index_DYLOxmlR.mjs';
import { sessionStore, getDriverConfig } from './chunks/session-driver_CO6sMJg1.mjs';
import { onRequest as onRequest$2 } from '@sentry/astro/middleware';

const SESSION_DATA_COOKIE = 'astro-session-data';
/**
 * Middleware that handles cookie-based session storage.
 *
 * Flow:
 * 1. BEFORE next(): Load existing session data from cookie into sessionStore
 *    - If dirty in-memory data exists without cookie, mark for deferred sync
 * 2. During request: Astro's session system uses our driver (reads/writes sessionStore)
 * 3. AFTER next(): Write dirty session data from sessionStore back to cookie
 *
 * Deferred Cookie Sync (handles 302 redirect race condition):
 * - POST /api/login -> sets session, returns 302, persist() writes to sessionStore
 * - GET / -> BEFORE detects dirty entry + no cookie -> needsCookieSync=true
 * - Page renders (driver reads from sessionStore)
 * - AFTER phase injects cookie into response
 * - Future requests have the cookie
 */
const onRequest$1 = async (context, next) => {
    // BEFORE: Load existing session data from cookie into sessionStore
    const sessionId = context.cookies.get('astro-session')?.value;
    const existingDataCookie = context.cookies.get(SESSION_DATA_COOKIE)?.value;
    let needsCookieSync = false;
    if (sessionId) {
        let inMemoryEntry = sessionStore.get(sessionId);
        // If we have a sessionId but no cookie and no in-memory entry,
        // the persist() from a previous request might still be running.
        // Wait briefly for it to complete (up to 50ms).
        if (!inMemoryEntry && !existingDataCookie) {
            for (let i = 0; i < 5 && !inMemoryEntry; i++) {
                await new Promise((resolve) => setTimeout(resolve, 10));
                inMemoryEntry = sessionStore.get(sessionId);
            }
        }
        if (inMemoryEntry?.dirty && !existingDataCookie) {
            // We have in-memory data that wasn't written to cookie yet
            // This is the deferred cookie sync case (happens after redirect)
            needsCookieSync = true;
        }
        else if (!inMemoryEntry && existingDataCookie) {
            // No in-memory data, but cookie exists - load from cookie
            sessionStore.set(sessionId, {
                data: existingDataCookie,
                dirty: false,
                timestamp: Date.now(),
            });
        }
    }
    // Run the request - session.persist() happens during this via Astro's finally block
    const response = await next();
    // AFTER: Write dirty session data back to cookie
    // Check for session ID again - it may have been created during the request
    const finalSessionId = context.cookies.get('astro-session')?.value;
    if (finalSessionId) {
        const entry = sessionStore.get(finalSessionId);
        // Write cookie if:
        // 1. Entry is dirty (new/modified session data from this request), OR
        // 2. We detected deferred sync needed in BEFORE phase
        const shouldWriteCookie = entry?.dirty || (needsCookieSync && sessionId === finalSessionId);
        if (shouldWriteCookie && entry) {
            const config = getDriverConfig();
            const ttl = config?.ttl ?? 604800;
            const cookieOptions = config?.cookieOptions;
            if (entry.data) {
                // Auto-detect secure from protocol
                const isSecure = context.request.url.startsWith('https://');
                // Determine domain: undefined for localhost, .domain.com for production
                let domain = cookieOptions?.domain;
                if (domain === undefined) {
                    const url = new URL(context.request.url);
                    const isLocalhost = url.hostname === 'localhost' || url.hostname === '127.0.0.1';
                    domain = isLocalhost ? undefined : `.${url.hostname}`;
                }
                // Set the session data cookie
                context.cookies.set(SESSION_DATA_COOKIE, entry.data, {
                    httpOnly: cookieOptions?.httpOnly ?? true,
                    secure: cookieOptions?.secure ?? isSecure,
                    sameSite: cookieOptions?.sameSite ?? 'lax',
                    path: cookieOptions?.path ?? '/',
                    domain,
                    maxAge: ttl,
                });
                // Mark as clean after writing cookie
                sessionStore.set(finalSessionId, { ...entry, dirty: false, timestamp: Date.now() });
            }
            else {
                // Empty data means destroy - delete cookie AND sessionStore entry
                context.cookies.delete(SESSION_DATA_COOKIE, {
                    path: cookieOptions?.path ?? '/',
                    domain: cookieOptions?.domain,
                });
                sessionStore.delete(finalSessionId);
            }
        }
    }
    return response;
};

const onRequest = sequence(
	onRequest$1,onRequest$2,
	
	
);

export { onRequest };
