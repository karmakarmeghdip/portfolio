import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { votes } from "@/lib/schema";
import { defineAction } from "astro:actions";
import { z } from "astro:schema";

export const vote = defineAction({
  input: z.object({
    postId: z.string(),
    vote: z.number().min(-1).max(1),
  }),
  handler: async (input, context) => {
    const authData = await auth.api.getSession({
      headers: context.request.headers,
    });
    if (!authData) {
      throw new Error("Unauthorized");
    }
    await db.insert(votes).values({
      id: crypto.randomUUID(),
      value: input.vote,
      createdBy: authData.user.id,
      postId: input.postId,
    }).onConflictDoUpdate({
      target: [votes.postId, votes.createdBy],
      set: {
        value: input.vote,
      },
    });
  },
});
