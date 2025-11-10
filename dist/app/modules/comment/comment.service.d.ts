import mongoose from "mongoose";
import { TComment } from "./comment.interface";
export declare const createComment: (payload: TComment) => Promise<(mongoose.Document<unknown, {}, TComment, {}, {}> & TComment & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}) | undefined>;
export declare const CommentServices: {
    createComment: (payload: TComment) => Promise<(mongoose.Document<unknown, {}, TComment, {}, {}> & TComment & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }) | undefined>;
    getAllCommentsByThreadId: (threadId: string) => Promise<{
        nestedComments: any;
        total: number;
    }>;
};
//# sourceMappingURL=comment.service.d.ts.map