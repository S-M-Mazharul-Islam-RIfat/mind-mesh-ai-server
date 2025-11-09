import status from "http-status";
import config from "../../config";
import AppError from "../../errors/AppError";
import { TUser } from "../user/user.interface";
import { UserModel } from "../user/user.model";
import { TLogin, TSignup } from "./auth.interface";
import { createToken } from "./auth.utils";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { ObjectId } from "mongodb";
import bcrypt from 'bcrypt';

const signup = async (payload: TSignup) => {
   const userData: Partial<TUser> = { ...payload };
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
      id: String(user._id),
      fullName: user.fullName,
      userName: user.userName,
      email: user.email,
      role: user.role,
      memberSince: user.memberSince
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

const refreshToken = async (token: string) => {
   // if the token is valid or not
   const decoded = jwt.verify(token, config.jwt_refresh_secret as string) as JwtPayload;
   const { email, iat } = decoded;

   // checking if the user is exist
   const user = await UserModel.isUserExistsByEmail(email);

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

   if (user.passwordChangedAt && UserModel.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)) {
      throw new AppError(status.UNAUTHORIZED, 'You are not authorized')
   }

   // create token and sent to the client
   const jwtPayload = {
      id: String(user._id),
      fullName: user.fullName,
      userName: user.userName,
      email: user.email,
      role: user.role,
      memberSince: user.memberSince
   }

   const accessToken = createToken(
      jwtPayload,
      config.jwt_access_secret as string,
      config.jwt_access_expires_in as string,
   );

   return {
      accessToken
   };
}

const changeUserInfo = async (payload) => {
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


   const result = await UserModel.findOneAndUpdate(
      { _id: new ObjectId(payload.id) },
      {
         fullName: payload.fullName,
         userName: payload.userName,
         email: payload.email,
      }
   );

   // create token and sent to the client
   const jwtPayload = {
      id: result?._id,
      fullName: result?.fullName,
      userName: result?.userName,
      email: result?.email,
      role: result?.role,
      memberSince: result?.memberSince
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

   return { accessToken, refreshToken, result };
}

const changePassword = async (payload) => {
   // checking if the user is exist
   const user = await UserModel.isUserExistsByEmail(payload?.email);
   if (!user) {
      throw new AppError(status.NOT_FOUND, 'User not found');
   }

   //checking if the password is correct

   if (!(await UserModel.isPasswordMatched(payload.oldPassword, user?.password)))
      throw new AppError(status.FORBIDDEN, 'Password do not matched');

   //hash new password
   const newHashedPassword = await bcrypt.hash(
      payload.newPassword,
      Number(config.bcrypt_salt_rounds),
   );

   await UserModel.findOneAndUpdate(
      { _id: new ObjectId(payload.id) },
      {
         password: newHashedPassword,
         passwordChangedAt: new Date(),
      }
   );

   return null;
}

export const AuthServices = {
   signup,
   login,
   refreshToken,
   changeUserInfo,
   changePassword
}