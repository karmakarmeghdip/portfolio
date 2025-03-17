import { z } from "zod";

// Base schema for all post types
export const basePostSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100),
  tags: z.string().optional(),
  type: z.enum(["text", "link", "image"]),
});

// Extended schemas for specific post types
export const textPostSchema = basePostSchema.extend({
  content: z.string().min(10, "Content must be at least 10 characters"),
});

export const linkPostSchema = basePostSchema.extend({
  content: z.string().url("Please enter a valid URL"),
});

export const imagePostSchema = basePostSchema.extend({});

// File validation helper
export const validateImageFile = (file: File | null): string | null => {
  if (!file) {
    return "Image file is required";
  }

  if (file.size > 5 * 1024 * 1024) {
    return "Image file must be less than 5MB";
  }

  return null;
};
