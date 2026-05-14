!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{};e.SENTRY_RELEASE={id:"51a973bd64882fbe40a2b1fa1d425937ebce5721"};var n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="0d2eb2ec-b28f-40aa-9f68-c9377120e314",e._sentryDebugIdIdentifier="sentry-dbid-0d2eb2ec-b28f-40aa-9f68-c9377120e314");}catch(e){}}();export { renderers } from '../../renderers.mjs';

async function GET() {
  throw new Error("Sentry Example API Route Error");
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
