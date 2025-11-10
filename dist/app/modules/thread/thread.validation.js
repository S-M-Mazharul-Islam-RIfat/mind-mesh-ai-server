"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThreadValidationSchema = exports.createThreadValidationSchema = void 0;
const zod_1 = require("zod");
exports.createThreadValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        author: zod_1.z.object({
            id: zod_1.z.string().min(1, "Author id email is required"),
            email: zod_1.z.string().min(1, "Author email is required"),
            userName: zod_1.z.string().min(3, "Author username is required")
        }),
        title: zod_1.z.string().min(5, "Title is required"),
        threadBody: zod_1.z.string().min(10, "Thread body is required"),
        tags: zod_1.z.array(zod_1.z.string()),
        commentsCount: zod_1.z.number().optional(),
        threadUpdatedAt: zod_1.z.date().optional(),
        isEdited: zod_1.z.boolean().optional(),
        isDeleted: zod_1.z.boolean().optional(),
    })
});
exports.ThreadValidationSchema = {
    createThreadValidationSchema: exports.createThreadValidationSchema
};
//# sourceMappingURL=thread.validation.js.map