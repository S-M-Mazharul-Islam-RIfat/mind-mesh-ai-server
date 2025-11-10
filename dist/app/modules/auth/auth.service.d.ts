import { TUser } from "../user/user.interface";
import { TLogin, TSignup } from "./auth.interface";
export declare const AuthServices: {
    signup: (payload: TSignup) => Promise<import("mongoose").Document<unknown, {}, TUser, {}, {}> & TUser & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    login: (payload: TLogin) => Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    refreshToken: (token: string) => Promise<{
        accessToken: string;
    }>;
    changeUserInfo: (payload: any) => Promise<{
        accessToken: string;
        refreshToken: string;
        result: (import("mongoose").Document<unknown, {}, TUser, {}, {}> & TUser & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }) | null;
    }>;
    changePassword: (payload: any) => Promise<null>;
};
//# sourceMappingURL=auth.service.d.ts.map