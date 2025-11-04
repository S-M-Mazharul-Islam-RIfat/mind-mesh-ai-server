import { Model } from "mongoose";

export interface TUser {
   fullName: string;
   userName: string;
   email: string;
   password: string;
   passwordChangedAt?: Date;
   role: 'user' | 'admin' | 'moderator';
   status: 'in-progress' | 'blocked';
   stats: {
      threadsCreated: number;
      postsAndReplies: number;
   }
   memberSince: string;
   isDeleted: boolean;
}


export interface UserModelType extends Model<TUser> {
   isUserExistsByEmail(email: string): Promise<TUser>;
   isPasswordMatched(plainTextPassword: string, hashedPassword: string): Promise<boolean>;
}