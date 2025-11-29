import { Types } from "mongoose";

export type TComment = {
   threadId: Types.ObjectId;
   parentId?: Types.ObjectId | null;
   commentBody: string;
   commentBy: Types.ObjectId;
   likes?: number;
   likedBy: Types.ObjectId[];
   isEdited?: boolean;
   isDeleted?: boolean;
}