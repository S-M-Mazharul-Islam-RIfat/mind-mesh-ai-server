import { Types } from "mongoose";

export type TThread = {
   author: Types.ObjectId;
   title: string;
   threadBody: string;
   tags: string[];
   threadUpdatedAt?: Date;
   isEdited?: boolean;
   isDeleted?: boolean;
}