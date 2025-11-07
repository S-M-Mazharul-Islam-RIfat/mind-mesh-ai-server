import { model, Schema } from "mongoose";
import { TThread } from "./thread.interface";
import { TAuthor } from "../../interface/author";

const authorSchema = new Schema<TAuthor>({
   id: {
      type: Schema.Types.ObjectId,
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
})

const threadSchema = new Schema<TThread>({
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
      default: Date.now
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
}
);

export const ThreadModel = model<TThread>("Thread", threadSchema);