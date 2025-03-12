import { createAuthClient } from "better-auth/react";
import { BASE_URL } from "@/lib/constants.ts";

const authClient = createAuthClient({
  baseURL: BASE_URL, // the base url of your auth server
});

export default authClient;
