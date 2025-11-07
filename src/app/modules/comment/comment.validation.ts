import z from "zod";

const authorSchema = z.object({
   id: z.string(),
   userName: z.string(),
   email: z.string(),
});

export const createCommentValidationSchema = z.object({
   body: z.object({
      threadId: z.string(),
      parentId: z.string().nullable().optional(),
      commentBody: z.string().min(1, "Comment body cannot be empty"),
      commentBy: authorSchema,
      likes: z.number().optional(),
      isEdited: z.boolean().optional(),
      isDeleted: z.boolean().optional(),
   })
});

export const CommentValidationSchema = {
   createCommentValidationSchema
}