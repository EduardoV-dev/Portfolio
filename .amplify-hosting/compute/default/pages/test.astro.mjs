!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{};e.SENTRY_RELEASE={id:"51a973bd64882fbe40a2b1fa1d425937ebce5721"};var n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="1f4649f9-4d67-470b-a0c9-4b265ec8fcdd",e._sentryDebugIdIdentifier="sentry-dbid-1f4649f9-4d67-470b-a0c9-4b265ec8fcdd");}catch(e){}}();import '@sentry/astro';
import { e as createComponent, l as renderScript, m as maybeRenderHead, r as renderTemplate } from '../chunks/astro/server_BQXoxoT-.mjs';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Test = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderScript($$result, "C:/Users/Eduardo Varela/Workspace/portfolio/portfolio/src/pages/test.astro?astro&type=script&index=0&lang.ts")} ${maybeRenderHead()}<button id="one" type="button">Throw a frontend error</button> <button id="two" type="button">Throw an API error</button>`;
}, "C:/Users/Eduardo Varela/Workspace/portfolio/portfolio/src/pages/test.astro", void 0);

const $$file = "C:/Users/Eduardo Varela/Workspace/portfolio/portfolio/src/pages/test.astro";
const $$url = "/test";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Test,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
