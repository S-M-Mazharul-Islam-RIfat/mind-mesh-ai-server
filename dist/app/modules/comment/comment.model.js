"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentModel = void 0;
const mongoose_1 = require("mongoose");
const authorSchema = new mongoose_1.Schema({
    id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    },
    userName: {
        type: String,
        required: [true, "Author username is required"],
    },
    email: {
        type: String,
        required: [true, "Author email is required"],
    },
});
const commentSchema = new mongoose_1.Schema({
    threadId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Thread'
    },
    parentId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Comment',
        default: null
    },
    commentBody: {
        type: String,
        required: [true, "Comment body is required"],
    },
    commentBy: {
        type: authorSchema,
        required: [true, "Comment author is required"],
    },
    likes: {
        type: Number,
        default: 0
    },
    isEdited: {
        type: Boolean,
        default: false,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
commentSchema.index({ threadId: 1 });
exports.CommentModel = (0, mongoose_1.model)("Comment", commentSchema);
//# sourceMappingURL=comment.model.js.map