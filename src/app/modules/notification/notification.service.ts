import { NotificationModel } from "./notification.model";

const getAllNotificationByUser = async (userId: string) => {
   const res = await NotificationModel.find({ userId });
   return res;
}

export const NotificationServices = {
   getAllNotificationByUser
}