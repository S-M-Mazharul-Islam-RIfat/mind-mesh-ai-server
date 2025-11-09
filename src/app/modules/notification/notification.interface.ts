import { Types } from "mongoose";

export type TNotification = {
   userId: Types.ObjectId;
   message: string;
   type: string;
   threadId: Types.ObjectId;
   threadTitle: string;
};