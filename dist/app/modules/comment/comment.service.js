"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentServices = exports.createComment = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const buildNestedComments_1 = require("../../utils/buildNestedComments");
const notification_queue_1 = require("../notification/notification.queue");
const thread_model_1 = require("../thread/thread.model");
const comment_model_1 = require("./comment.model");
const notification_model_1 = require("../notification/notification.model");
const cache_1 = require("../../utils/cache");
const redis_1 = __importDefault(require("../../config/redis"));
const createComment = async (payload) => {
    const pattren = `comments:${payload.threadId}`;
    const keys = await redis_1.default.keys(pattren);
    if (keys.length > 0) {
        (0, cache_1.deleteAllCache)(keys);
    }
    const session = await mongoose_1.default.startSession();
    session.startTransaction();
    try {
        // create the comment
        const [comment] = await comment_model_1.CommentModel.create([payload], { session });
        // find the thread
        const thread = await thread_model_1.ThreadModel.findById(payload.threadId).session(session);
        if (!thread) {
            throw new Error("Thread not found");
        }
        // determine who should get notified
        let recipientUserId = null;
        let message = "";
        let shouldNotify = false;
        let replyType = "comment";
        if (!payload.parentId) {
            // notify thread author
            if (thread.author.id.toString() !== payload.commentBy.id.toString()) {
                recipientUserId = thread.author.id;
                message = `${payload.commentBy.userName} commented on your thread.`;
                shouldNotify = true;
            }
        }
        else {
            // notify parent comment author (if not same user)
            const parentComment = await comment_model_1.CommentModel.findById(payload.parentId).session(session);
            if (parentComment && parentComment.commentBy.id.toString() !== payload.commentBy.id.toString()) {
                recipientUserId = parentComment.commentBy.id;
                message = `${payload.commentBy.userName} replied to your comment.`;
                shouldNotify = true;
                replyType = "reply";
            }
        }
        // create notification if applicable
        let notificationDoc = null;
        if (shouldNotify && recipientUserId) {
            const reply = {
                userId: recipientUserId,
                message,
                type: `${replyType}`,
                threadId: payload.threadId,
                threadTitle: thread.title,
            };
            [notificationDoc] = await notification_model_1.NotificationModel.create([reply], { session });
        }
        // commit transaction
        await session.commitTransaction();
        session.endSession();
        // push to queue
        if (shouldNotify && notificationDoc) {
            await notification_queue_1.notificationQueue.add("send-notification", notificationDoc.toObject());
        }
        return comment;
    }
    catch (error) {
        console.error("Transaction failed:", error.message);
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};
exports.createComment = createComment;
const getAllCommentsByThreadId = async (threadId) => {
    const total = await comment_model_1.CommentModel.countDocuments({ threadId });
    const cacheKey = `comments:${threadId}`;
    const cachedData = await (0, cache_1.getCache)(cacheKey);
    let nestedComments;
    if (cachedData) {
        nestedComments = cachedData;
        return { nestedComments, total };
    }
    const allComments = await comment_model_1.CommentModel.find({ threadId }).sort({ createdAt: -1 });
    nestedComments = (0, buildNestedComments_1.buildNestedComments)(allComments);
    await (0, cache_1.setCache)(cacheKey, nestedComments, 1200);
    return { nestedComments, total };
};
exports.CommentServices = {
    createComment: exports.createComment,
    getAllCommentsByThreadId,
};
//# sourceMappingURL=comment.service.js.map