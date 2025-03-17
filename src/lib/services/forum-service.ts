import { db } from "@/lib/db";
import { posts, postTags, tags } from "@/lib/schema/forum-schema";
import { nanoid } from "nanoid";
import { and, eq } from "drizzle-orm";

type PostData = {
  title: string;
  content: string;
  type: "text" | "link" | "image";
  tags?: string;
  userId: string;
};

export async function createPost(data: PostData) {
  const postId = nanoid();

  // Create the post
  await db.insert(posts).values({
    id: postId,
    title: data.title,
    content: data.content,
    type: data.type,
    createdBy: data.userId,
  });

  // Process tags if provided
  if (data.tags) {
    const tagNames = data.tags.split(",").map((tag) => tag.trim()).filter(
      Boolean,
    );

    for (const tagName of tagNames) {
      // Check if tag exists or create it
      let tagId;
      const existingTag = await db.select({ id: tags.id })
        .from(tags)
        .where(eq(tags.name, tagName))
        .limit(1);

      if (existingTag.length > 0) {
        tagId = existingTag[0].id;
      } else {
        tagId = nanoid();
        await db.insert(tags).values({
          id: tagId,
          name: tagName,
          createdBy: data.userId,
        });
      }

      // Link the tag to the post
      await db.insert(postTags).values({
        id: nanoid(),
        postId: postId,
        tagId: tagId,
        createdBy: data.userId,
      });
    }
  }

  return postId;
}

export async function uploadImage(file: File): Promise<string> {
  // Implement image upload logic here
  // This would typically upload to a storage service and return the URL
  // For now, we'll just return a placeholder
  console.log("Uploading image:", file.name);
  return "/images/placeholder.jpg";
}
