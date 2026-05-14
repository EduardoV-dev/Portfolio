!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{};e.SENTRY_RELEASE={id:"51a973bd64882fbe40a2b1fa1d425937ebce5721"};var n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="84f77071-e29b-4371-ab1d-75981ec44fc6",e._sentryDebugIdIdentifier="sentry-dbid-84f77071-e29b-4371-ab1d-75981ec44fc6");}catch(e){}}();import { ap as NOOP_MIDDLEWARE_HEADER } from './astro/server_BQXoxoT-.mjs';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

export { NOOP_MIDDLEWARE_FN as N };
