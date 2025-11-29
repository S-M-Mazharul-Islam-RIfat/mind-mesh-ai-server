import { model, Schema } from "mongoose";
import { TThread } from "./thread.interface";

const threadSchema = new Schema<TThread>({
   author: {
      type: Schema.Types.ObjectId,
      ref: 'User'
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
}
);

export const ThreadModel = model<TThread>("Thread", threadSchema);