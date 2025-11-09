import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import status from "http-status";
import { NotificationServices } from "./notification.service";

const getAllNotificationByUserController = catchAsync(async (req: Request, res: Response) => {
   const { id } = req.params;
   const result = await NotificationServices.getAllNotificationByUser(id!);
   sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Get all notification successfully',
      data: result
   })
})

export const NotificationControllers = {
   getAllNotificationByUserController
}
