import { NotificationModel } from "./notification.model";

const getAllNotificationByUser = async (userId: string, page: number, limit: number) => {
   const skip = (page - 1) * limit;
   const notifications = await NotificationModel.find({ userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
   const total = await NotificationModel.countDocuments({ userId });
   const res = { notifications, total, totalPages: Math.ceil(total / limit) };
   return res;
}

export const NotificationServices = {
   getAllNotificationByUser
}