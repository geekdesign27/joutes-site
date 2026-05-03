import { defineMiddleware } from "astro:middleware";

/**
 * Sur Vercel, request.url arrive parfois avec hostname=localhost dans les
 * Serverless Functions, ce qui casse la construction du redirect_uri OAuth
 * de Keystatic. On force ici l'origine correcte pour les routes Keystatic.
 */
const PUBLIC_URL =
  import.meta.env.KEYSTATIC_URL || "https://joutesinterpompiers2026.ch";

export const onRequest = defineMiddleware(async (ctx, next) => {
  const path = ctx.url.pathname;
  const isKeystatic =
    path.startsWith("/api/keystatic/") || path.startsWith("/keystatic/");

  if (isKeystatic) {
    const expected = new URL(path + ctx.url.search, PUBLIC_URL).toString();
    if (ctx.request.url !== expected) {
      const corrected = new Request(expected, {
        method: ctx.request.method,
        headers: ctx.request.headers,
        body: ["GET", "HEAD"].includes(ctx.request.method)
          ? undefined
          : ctx.request.body,
        // @ts-expect-error duplex required for streaming bodies in Node
        duplex: "half",
      });
      Object.defineProperty(ctx, "request", {
        value: corrected,
        writable: false,
      });
    }
  }

  return next();
});
