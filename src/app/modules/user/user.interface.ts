import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export type TUser = {
   fullName: string;
   userName: string;
   email: string;
   password: string;
   passwordChangedAt?: Date;
   role: 'user' | 'admin' | 'moderator';
   status: 'in-progress' | 'blocked';
   memberSince: string;
   isDeleted: boolean;
}

export type TUserRole = keyof typeof USER_ROLE;

export interface UserModelType extends Model<TUser> {
   isUserExistsByEmail(email: string): Promise<TUser>;
   isPasswordMatched(plainTextPassword: string, hashedPassword: string): Promise<boolean>;
}