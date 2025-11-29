import { InferSchemaType, model, Schema } from "mongoose";
import { TComment } from "./comment.interface";
import { required } from "zod/mini";

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
      type: Schema.Types.ObjectId,
      ref: 'User'
   },
   likes: {
      type: Number,
      default: 0
   },
   likedBy: [
      {
         type: Schema.Types.ObjectId,
         ref: 'User',
      }
   ],
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

export type Comment = InferSchemaType<typeof commentSchema>;
export const CommentModel = model<TComment>("Comment", commentSchema);