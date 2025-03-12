import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import spotifyRoute from "./spotify.ts";
import { auth } from "./auth.ts";

export const api = new Hono()
  .use(logger())
  .use(
    cors({
      origin: ["https://meghdip.is-a.dev", "http://localhost:5173"],
      allowHeaders: ["Content-Type", "Authorization"],
      allowMethods: ["POST", "GET", "OPTIONS"],
      exposeHeaders: ["Content-Length"],
      maxAge: 600,
      credentials: true,
    }),
  )
  .on(["GET", "POST"], "/api/auth/**", (c) => auth.handler(c.req.raw))
  .route("/", spotifyRoute);

Deno.serve(api.fetch);
