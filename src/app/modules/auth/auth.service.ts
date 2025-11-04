import status from "http-status";
import config from "../../config";
import AppError from "../../errors/AppError";
import { TUser } from "../user/user.interface";
import { UserModel } from "../user/user.model";
import { TLogin, TSignup } from "./auth.interface";
import { createToken } from "./auth.utils";

const signup = async (payload: TSignup) => {
   const userData: Partial<TUser> = { ...payload };
   if (payload.password !== payload.confirmPassword) {
      throw new AppError(status.BAD_REQUEST, "Passwords do not match");
   }
   userData.memberSince = new Date().toISOString().split('T')[0]!;
   const newUser = await UserModel.create(userData);
   return newUser;
}

const login = async (payload: TLogin) => {
   // checking if the user is exist
   const user = await UserModel.isUserExistsByEmail(payload?.email);
   if (!user) {
      throw new AppError(status.NOT_FOUND, 'User not found');
   }

   // checking if the user is already deleted
   const isDeleted = user?.isDeleted;
   if (isDeleted) {
      throw new AppError(status.FORBIDDEN, 'This user is deleted');
   }

   // check if the user is blocked or not
   const userStatus = user?.status;
   if (userStatus === 'blocked') {
      throw new AppError(status.FORBIDDEN, 'This user is blocked');
   }

   // check if the password is correct
   const passwordMatched = await UserModel.isPasswordMatched(payload?.password, user?.password);
   if (!passwordMatched) {
      throw new AppError(status.FORBIDDEN, 'Password is not matched');
   }

   // create token
   const jwtPayload = {
      email: user.email,
      role: user.role
   }

   const accessToken = createToken(
      jwtPayload,
      config.jwt_access_secret as string,
      config.jwt_access_expires_in as string,
   );

   const refreshToken = createToken(
      jwtPayload,
      config.jwt_refresh_secret as string,
      config.jwt_refresh_expires_in as string,
   );

   return {
      accessToken,
      refreshToken,
   }
}

const changeUserInfo = async (userName: string, payload: Partial<TUser>) => {
   const result = UserModel.findOneAndUpdate({ userName }, { $set: { fullName: payload?.fullName } });
   return result;
}

export const AuthServices = {
   signup,
   login,
   changeUserInfo
}