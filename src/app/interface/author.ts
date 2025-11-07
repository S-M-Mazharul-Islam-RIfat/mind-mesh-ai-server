import { Types } from "mongoose";

export type TAuthor = {
   id: Types.ObjectId;
   userName: string;
   email: string;
}
