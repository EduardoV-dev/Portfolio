!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{};e.SENTRY_RELEASE={id:"51a973bd64882fbe40a2b1fa1d425937ebce5721"};var n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="fdcf8c62-2c3b-45fb-93e8-5e1dab0b9ac4",e._sentryDebugIdIdentifier="sentry-dbid-fdcf8c62-2c3b-45fb-93e8-5e1dab0b9ac4");}catch(e){}}();import { renderers } from './renderers.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_BD2iSbJU.mjs';
import { manifest } from './manifest_Dic-CXu-.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/500.astro.mjs');
const _page3 = () => import('./pages/about.astro.mjs');
const _page4 = () => import('./pages/api/test-error.astro.mjs');
const _page5 = () => import('./pages/architecture.astro.mjs');
const _page6 = () => import('./pages/blog/_slug_.astro.mjs');
const _page7 = () => import('./pages/blog.astro.mjs');
const _page8 = () => import('./pages/case-studies/_slug_.astro.mjs');
const _page9 = () => import('./pages/case-studies.astro.mjs');
const _page10 = () => import('./pages/contact.astro.mjs');
const _page11 = () => import('./pages/privacy-policy.astro.mjs');
const _page12 = () => import('./pages/sitemap.xml.astro.mjs');
const _page13 = () => import('./pages/terms-of-use.astro.mjs');
const _page14 = () => import('./pages/test.astro.mjs');
const _page15 = () => import('./pages/tunnel.astro.mjs');
const _page16 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/.pnpm/astro@5.18.1_@types+node@20_41ab6c370724e72ac54b9662cc13c64b/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/500.astro", _page2],
    ["src/pages/about.astro", _page3],
    ["src/pages/api/test-error.ts", _page4],
    ["src/pages/architecture.astro", _page5],
    ["src/pages/blog/[slug].astro", _page6],
    ["src/pages/blog.astro", _page7],
    ["src/pages/case-studies/[slug].astro", _page8],
    ["src/pages/case-studies.astro", _page9],
    ["src/pages/contact.astro", _page10],
    ["src/pages/privacy-policy.astro", _page11],
    ["src/pages/sitemap.xml.ts", _page12],
    ["src/pages/terms-of-use.astro", _page13],
    ["src/pages/test.astro", _page14],
    ["src/pages/tunnel.ts", _page15],
    ["src/pages/index.astro", _page16]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = {
    "mode": "standalone",
    "client": "file:///C:/Users/Eduardo%20Varela/Workspace/portfolio/portfolio/.amplify-hosting/static/",
    "server": "file:///C:/Users/Eduardo%20Varela/Workspace/portfolio/portfolio/.amplify-hosting/compute/default/",
    "host": false,
    "port": 3000,
    "assets": "_astro",
    "experimentalStaticHeaders": false
};

const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { pageMap };
