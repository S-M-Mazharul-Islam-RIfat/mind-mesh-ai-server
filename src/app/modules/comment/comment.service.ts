import mongoose from "mongoose";
import { buildNestedComments } from "../../utils/buildNestedComments";
import { notificationQueue } from "../notification/notification.queue";
import { ThreadModel } from "../thread/thread.model";
import { TComment } from "./comment.interface";
import { CommentModel } from "./comment.model";
import { TNotification } from "../notification/notification.interface";
import { NotificationModel } from "../notification/notification.model";

export const createComment = async (payload: TComment) => {
   const session = await mongoose.startSession();
   session.startTransaction();

   try {
      // create the comment
      const [comment] = await CommentModel.create([payload], { session });

      // find the thread
      const thread = await ThreadModel.findById(payload.threadId).session(session);
      if (!thread) {
         throw new Error("Thread not found");
      }

      // determine who should get notified
      let recipientUserId: mongoose.Types.ObjectId | null = null;
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
      } else {
         // notify parent comment author (if not same user)
         const parentComment = await CommentModel.findById(payload.parentId).session(session);
         if (parentComment && parentComment.commentBy.id.toString() !== payload.commentBy.id.toString()) {
            recipientUserId = parentComment.commentBy.id;
            message = `${payload.commentBy.userName} replied to your comment.`;
            shouldNotify = true;
            replyType = "reply"
         }
      }

      // create notification if applicable
      let notificationDoc = null;
      if (shouldNotify && recipientUserId) {
         const reply: TNotification = {
            userId: recipientUserId,
            message,
            type: `${replyType}`,
            threadId: payload.threadId,
            threadTitle: thread.title,
         };

         [notificationDoc] = await NotificationModel.create([reply], { session });
      }

      // commit transaction
      await session.commitTransaction();
      session.endSession();

      // push to queue
      if (shouldNotify && notificationDoc) {
         await notificationQueue.add("send-notification", notificationDoc.toObject());
      }
      return comment;
   } catch (error: any) {
      console.error("Transaction failed:", error.message);
      await session.abortTransaction();
      session.endSession();
      throw error;
   }
};

const getAllCommentsByThreadId = async (threadId: string) => {
   const allComments = await CommentModel.find({ threadId }).sort({ createdAt: -1 });
   const nestedComments = buildNestedComments(allComments);
   const total = await CommentModel.countDocuments({ threadId });
   return { nestedComments, total };
}

export const CommentServices = {
   createComment,
   getAllCommentsByThreadId,
}