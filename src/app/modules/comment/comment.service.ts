import mongoose from "mongoose";
import { buildNestedComments } from "../../utils/buildNestedComments";
import { notificationQueue } from "../notification/notification.queue";
import { ThreadModel } from "../thread/thread.model";
import { TComment } from "./comment.interface";
import { CommentModel } from "./comment.model";
import { TNotification } from "../notification/notification.interface";
import { NotificationModel } from "../notification/notification.model";
import { deleteAllCache, getCache, setCache } from "../../utils/cache";
import redis from "../../config/redis";
import { UserModel } from "../user/user.model";

export const createComment = async (payload: TComment) => {
   const pattren = `comments:${payload.threadId}`;
   const keys = await redis.keys(pattren);
   if (keys.length > 0) {
      deleteAllCache(keys);
   }

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

      // get the comment author
      const commentByAuthor = await UserModel.findById(payload.commentBy).session(session);
      if (!commentByAuthor) {
         throw new Error("Comment by author not found");
      }

      if (!payload.parentId) {
         // notify thread author
         if (thread.author.toString() !== payload.commentBy.toString()) {
            recipientUserId = thread.author;
            message = `${commentByAuthor?.userName} commented on your thread.`;
            shouldNotify = true;
         }
      }
      else {
         // notify parent comment author (if not same user)
         const parentComment = await CommentModel.findById(payload.parentId).session(session);
         if (parentComment && parentComment.commentBy.toString() !== payload.commentBy.toString()) {
            recipientUserId = parentComment.commentBy;
            message = `${commentByAuthor?.userName} replied to your comment.`;
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
   const total = await CommentModel.countDocuments({ threadId });

   const cacheKey = `comments:${threadId}`;
   const cachedData = await getCache(cacheKey);
   let nestedComments;
   if (cachedData) {
      nestedComments = cachedData;
      return { nestedComments, total };
   }

   const allComments = await CommentModel.find({ threadId }).populate('commentBy', 'userName email').sort({ createdAt: -1 });
   nestedComments = buildNestedComments(allComments);

   await setCache(cacheKey, nestedComments, 1200);
   return { nestedComments, total };
}

const addLikeInComment = async (commentId: string, userId: string) => {
   const pattren = `comments:*`;
   const keys = await redis.keys(pattren);
   if (keys.length > 0) {
      deleteAllCache(keys);
   }
   const res = await CommentModel.findByIdAndUpdate(
      commentId,
      {
         $addToSet: { likedBy: userId },
         $inc: { likes: 1 }
      }
   );
   return res;
}

const removeLikeFromComment = async (commentId: string, userId: string) => {
   const pattren = `comments:*`;
   const keys = await redis.keys(pattren);
   if (keys.length > 0) {
      deleteAllCache(keys);
   }
   const res = await CommentModel.findByIdAndUpdate(
      commentId,
      {
         $pull: { likedBy: userId },
         $inc: { likes: -1 }
      }
   );
   return res;
}

export const CommentServices = {
   createComment,
   getAllCommentsByThreadId,
   addLikeInComment,
   removeLikeFromComment
}