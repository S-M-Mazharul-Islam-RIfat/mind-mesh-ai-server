import { Types } from "mongoose";
import { TAuthor } from "../../interface/author";
export type TComment = {
    threadId: Types.ObjectId;
    parentId?: Types.ObjectId | null;
    commentBody: string;
    commentBy: TAuthor;
    likes?: number;
    isEdited?: boolean;
    isDeleted?: boolean;
};
//# sourceMappingURL=comment.interface.d.ts.map