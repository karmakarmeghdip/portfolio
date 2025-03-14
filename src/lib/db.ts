import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { TURSO_AUTH_TOKEN, TURSO_DATABASE_URL } from "astro:env/server";

const client = createClient({
  url: TURSO_DATABASE_URL!,
  authToken: TURSO_AUTH_TOKEN,
});

export const db = drizzle({
  client,
});
