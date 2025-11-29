import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { NotificationServices } from "./notification.service";

const getAllNotificationByUserController = catchAsync(async (req: Request, res: Response) => {
   const page = Number(req.query.page) || 1;
   const limit = Number(req.query.limit) || 5;
   const userId = String(req.query.userId);
   const result = await NotificationServices.getAllNotificationByUser(userId!, page!, limit!);
   res.status(200).json({
      success: true,
      message: 'All notifications retrived successfully',
      data: result.notifications,
      meta: { totalPages: result.totalPages, total: result.total }
   })
})

export const NotificationControllers = {
   getAllNotificationByUserController
}
