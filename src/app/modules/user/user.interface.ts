import { Model } from "mongoose";

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

export interface UserModelType extends Model<TUser> {
   isUserExistsByEmail(email: string): Promise<TUser>;
   isPasswordMatched(plainTextPassword: string, hashedPassword: string): Promise<boolean>;
   isJWTIssuedBeforePasswordChanged(passwordChangedTimestamp: Date, jwtIssuedTimestamp: number): boolean;
}