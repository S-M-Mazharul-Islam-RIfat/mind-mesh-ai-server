import { z } from "zod";
export declare const createThreadValidationSchema: z.ZodObject<{
    body: z.ZodObject<{
        author: z.ZodObject<{
            id: z.ZodString;
            email: z.ZodString;
            userName: z.ZodString;
        }, z.core.$strip>;
        title: z.ZodString;
        threadBody: z.ZodString;
        tags: z.ZodArray<z.ZodString>;
        commentsCount: z.ZodOptional<z.ZodNumber>;
        threadUpdatedAt: z.ZodOptional<z.ZodDate>;
        isEdited: z.ZodOptional<z.ZodBoolean>;
        isDeleted: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const ThreadValidationSchema: {
    createThreadValidationSchema: z.ZodObject<{
        body: z.ZodObject<{
            author: z.ZodObject<{
                id: z.ZodString;
                email: z.ZodString;
                userName: z.ZodString;
            }, z.core.$strip>;
            title: z.ZodString;
            threadBody: z.ZodString;
            tags: z.ZodArray<z.ZodString>;
            commentsCount: z.ZodOptional<z.ZodNumber>;
            threadUpdatedAt: z.ZodOptional<z.ZodDate>;
            isEdited: z.ZodOptional<z.ZodBoolean>;
            isDeleted: z.ZodOptional<z.ZodBoolean>;
        }, z.core.$strip>;
    }, z.core.$strip>;
};
//# sourceMappingURL=thread.validation.d.ts.map