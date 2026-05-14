!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{};e.SENTRY_RELEASE={id:"51a973bd64882fbe40a2b1fa1d425937ebce5721"};var n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="7b5a30f1-dc73-478d-9f85-f8e38e6a21d2",e._sentryDebugIdIdentifier="sentry-dbid-7b5a30f1-dc73-478d-9f85-f8e38e6a21d2");}catch(e){}}();export { renderers } from '../renderers.mjs';

function getProjectIdFromDsn(dsn) {
  const dsnUrl = new URL(dsn);
  const pathnameParts = dsnUrl.pathname.split("/").filter(Boolean);
  return pathnameParts[pathnameParts.length - 1] || "";
}
function getEnvelopeDsn(envelope) {
  const firstLine = envelope.split("\n", 1)[0];
  if (!firstLine) {
    return null;
  }
  try {
    const header = JSON.parse(firstLine);
    return typeof header.dsn === "string" ? header.dsn : null;
  } catch {
    return null;
  }
}
const POST = async ({ request }) => {
  const configuredDsn = "https://0514180f619f1591d23550b39665e48e@o4511383342415872.ingest.us.sentry.io/4511383365419008";
  const bodyBuffer = await request.arrayBuffer();
  const bodyText = new TextDecoder().decode(bodyBuffer);
  const envelopeDsn = getEnvelopeDsn(bodyText);
  if (!envelopeDsn) {
    return new Response("Invalid Sentry envelope", { status: 400 });
  }
  const configuredDsnUrl = new URL(configuredDsn);
  const envelopeDsnUrl = new URL(envelopeDsn);
  const configuredProjectId = getProjectIdFromDsn(configuredDsn);
  const envelopeProjectId = getProjectIdFromDsn(envelopeDsn);
  if (configuredDsnUrl.hostname !== envelopeDsnUrl.hostname || configuredProjectId !== envelopeProjectId) {
    return new Response("Sentry DSN not allowed", { status: 403 });
  }
  const upstreamUrl = `${configuredDsnUrl.protocol}//${configuredDsnUrl.host}/api/${configuredProjectId}/envelope/`;
  const upstreamResponse = await fetch(upstreamUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-sentry-envelope"
    },
    body: bodyBuffer
  });
  return new Response(null, { status: upstreamResponse.status });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
