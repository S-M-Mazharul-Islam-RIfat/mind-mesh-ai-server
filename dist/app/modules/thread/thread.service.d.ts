import { TThread } from "./thread.interface";
export declare const ThreadServices: {
    createThread: (payload: TThread) => Promise<import("mongoose").Document<unknown, {}, TThread, {}, {}> & TThread & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getAllThread: (payload: {
        page: number;
        limit: number;
        search: string;
    }) => Promise<any>;
    getSingleThread: (id: string) => Promise<any>;
};
//# sourceMappingURL=thread.service.d.ts.map