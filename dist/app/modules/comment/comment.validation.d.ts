import z from "zod";
export declare const createCommentValidationSchema: z.ZodObject<{
    body: z.ZodObject<{
        threadId: z.ZodString;
        parentId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        commentBody: z.ZodString;
        commentBy: z.ZodObject<{
            id: z.ZodString;
            userName: z.ZodString;
            email: z.ZodString;
        }, z.core.$strip>;
        likes: z.ZodOptional<z.ZodNumber>;
        isEdited: z.ZodOptional<z.ZodBoolean>;
        isDeleted: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const CommentValidationSchema: {
    createCommentValidationSchema: z.ZodObject<{
        body: z.ZodObject<{
            threadId: z.ZodString;
            parentId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            commentBody: z.ZodString;
            commentBy: z.ZodObject<{
                id: z.ZodString;
                userName: z.ZodString;
                email: z.ZodString;
            }, z.core.$strip>;
            likes: z.ZodOptional<z.ZodNumber>;
            isEdited: z.ZodOptional<z.ZodBoolean>;
            isDeleted: z.ZodOptional<z.ZodBoolean>;
        }, z.core.$strip>;
    }, z.core.$strip>;
};
//# sourceMappingURL=comment.validation.d.ts.map