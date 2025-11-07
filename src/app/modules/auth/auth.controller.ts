import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { AuthServices } from "./auth.service";
import sendResponse from "../../utils/sendResponse";
import status from "http-status";
import config from "../../config";

const signupUserController = catchAsync(async (req: Request, res: Response) => {
   const result = await AuthServices.signup(req.body);
   sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'User signup successfully',
      data: result
   })
})

const loginUserController = catchAsync(async (req: Request, res: Response) => {
   const result = await AuthServices.login(req.body);
   const { accessToken, refreshToken } = result;
   res.cookie('refreshToken', refreshToken, {
      secure: config.NODE_ENV === 'production',
      httpOnly: true
   })

   sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'User logged in successfully',
      data: {
         accessToken,
      }
   })
})

const refreshTokenController = catchAsync(async (req, res) => {
   const { refreshToken } = req.cookies;
   const result = await AuthServices.refreshToken(refreshToken);

   sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Access token is retrived successfully',
      data: result
   })
})

export const AuthControllers = {
   signupUserController,
   loginUserController,
   refreshTokenController,
}