import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import status from "http-status";

const getUserInfoByUserIdController = catchAsync(async (req: Request, res: Response) => {
   const { id } = req.params;
   const result = await UserServices.getUserInfoByUserId(id!);
   sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'User info retrived successfully',
      data: result
   })
})

export const UserControllers = {
   getUserInfoByUserIdController
}