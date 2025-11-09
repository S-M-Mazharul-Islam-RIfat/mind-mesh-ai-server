import { TAuthor } from "../../interface/author";

export type TThread = {
   author: TAuthor;
   title: string;
   threadBody: string;
   tags: string[];
   threadUpdatedAt?: Date;
   isEdited?: boolean;
   isDeleted?: boolean;
}