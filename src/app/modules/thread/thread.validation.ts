import { z } from "zod";

export const createThreadValidationSchema = z.object({
   body: z.object({
      author: z.string().min(1, "Author id email is required"),
      title: z.string().min(5, "Title is required"),
      threadBody: z.string().min(10, "Thread body is required"),
      tags: z.array(z.string()),
      commentsCount: z.number().optional(),
      threadUpdatedAt: z.date().optional(),
      isEdited: z.boolean().optional(),
      isDeleted: z.boolean().optional(),
   })
});

export const ThreadValidationSchema = {
   createThreadValidationSchema
}
