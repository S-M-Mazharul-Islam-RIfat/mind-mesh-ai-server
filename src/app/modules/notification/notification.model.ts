import { model, Schema } from "mongoose";
import { TNotification } from "./notification.interface";

const notificationSchema = new Schema<TNotification>({
   userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
   },
   message: {
      type: String,
      required: true,
   },
   type: {
      type: String,
      required: true,
   },
   threadId: {
      type: Schema.Types.ObjectId,
      ref: "Thread",
   },
   threadTitle: {
      type: String,
   },
}, {
   timestamps: true,
}
);

export const NotificationModel = model<TNotification>("Notification", notificationSchema);