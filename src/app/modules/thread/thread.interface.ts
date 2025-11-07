import { Types } from "mongoose";
import { TAuthor } from "../../interface/author";

export type TThread = {
   author: TAuthor;
   title: string;
   threadBody: string;
   tags: string[];
   commentsCount?: number;
   threadUpdatedAt?: Date;
   isEdited?: boolean;
   isDeleted?: boolean;
}