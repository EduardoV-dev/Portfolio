export default {
    async ping(ctx: { body: unknown }) {
        ctx.body = {
            ok: true,
            timestamp: new Date().toISOString(),
        };
    },
};
