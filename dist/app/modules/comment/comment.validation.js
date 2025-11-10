"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentValidationSchema = exports.createCommentValidationSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const authorSchema = zod_1.default.object({
    id: zod_1.default.string(),
    userName: zod_1.default.string(),
    email: zod_1.default.string(),
});
exports.createCommentValidationSchema = zod_1.default.object({
    body: zod_1.default.object({
        threadId: zod_1.default.string(),
        parentId: zod_1.default.string().nullable().optional(),
        commentBody: zod_1.default.string().min(1, "Comment body cannot be empty"),
        commentBy: authorSchema,
        likes: zod_1.default.number().optional(),
        isEdited: zod_1.default.boolean().optional(),
        isDeleted: zod_1.default.boolean().optional(),
    })
});
exports.CommentValidationSchema = {
    createCommentValidationSchema: exports.createCommentValidationSchema
};
//# sourceMappingURL=comment.validation.js.map