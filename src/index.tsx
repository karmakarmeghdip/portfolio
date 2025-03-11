import { serve } from "bun";
import index from "./index.html";
import { api } from "./api";

const server = serve({
  routes: {
    // Serve index.html for all unmatched routes.
    "/": index,
  },

  fetch: api.fetch,
  development: process.env.NODE_ENV !== "production",
});

console.log(`🚀 Server running at ${server.url}`);
