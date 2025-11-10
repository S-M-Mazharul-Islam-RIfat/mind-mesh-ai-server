"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThreadModel = void 0;
const mongoose_1 = require("mongoose");
const authorSchema = new mongoose_1.Schema({
    id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    },
    email: {
        type: String,
        required: [true, 'Author email is required']
    },
    userName: {
        type: String,
        required: [true, 'Author username is required']
    }
});
const threadSchema = new mongoose_1.Schema({
    author: {
        type: authorSchema,
        required: [true, 'Author is required']
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    threadBody: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        required: true,
    },
    threadUpdatedAt: {
        type: Date,
        default: Date.now()
    },
    isEdited: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
});
exports.ThreadModel = (0, mongoose_1.model)("Thread", threadSchema);
//# sourceMappingURL=thread.model.js.map