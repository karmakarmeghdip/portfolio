import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { contact } from "@/lib/schema";
import { defineAction } from "astro:actions";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const contactSubmit = defineAction({
  accept: "form",
  input: z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    jobType: z.enum(["freelance", "fulltime", "contract"]),
    amount: z.number().min(1, "Please enter an amount"),
    description: z.string().min(
      10,
      "Description must be at least 10 characters",
    ),
  }),
  handler: async (input, context) => {
    const authData = await auth.api.getSession({
      headers: context.request.headers,
    });
    if (!authData) {
      throw new Error("Unauthorized");
    }
    const { jobType, amount, description } = input;
    const { user } = authData;
    await db.insert(contact).values({
      id: crypto.randomUUID(),
      name: user.name,
      email: user.email,
      jobType,
      amount: amount,
      description,
      created_by: user.id,
    });
  },
});

export const contactDelete = defineAction({
  input: z.object({
    id: z.string(),
  }),
  handler: async (input, context) => {
    const authData = await auth.api.getSession({
      headers: context.request.headers,
    });
    if (!authData || authData.user.email !== "karmakarmeghdip@gmail.com") {
      throw new Error("Unauthorized");
    }
    await db.delete(contact).where(eq(contact.id, input.id));
  },
});
