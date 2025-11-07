import { buildNestedComments } from "../../utils/buildNestedComments";
import { TComment } from "./comment.interface";
import { CommentModel } from "./comment.model";
import { ObjectId } from "mongodb";
const createComment = async (payload: TComment) => {
   const res = await CommentModel.create(payload);
   return res;
}

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