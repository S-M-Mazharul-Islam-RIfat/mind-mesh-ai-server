import { model, Schema } from "mongoose";
import { TComment } from "./comment.interface";
import { TAuthor } from "../../interface/author";

const authorSchema = new Schema<TAuthor>({
   id: {
      type: Schema.Types.ObjectId,
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

const commentSchema = new Schema<TComment>({
   threadId: {
      type: Schema.Types.ObjectId,
      ref: 'Thread'
   },
   parentId: {
      type: Schema.Types.ObjectId,
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

export const CommentModel = model<TComment>("Comment", commentSchema);