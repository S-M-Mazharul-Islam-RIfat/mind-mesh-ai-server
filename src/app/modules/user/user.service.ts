import { UserModel } from "./user.model"

const getUserInfoByUserName = async (userName: string) => {
   const userInfo = await UserModel.findOne({ userName });
   return userInfo;
}

export const UserServices = {
   getUserInfoByUserName
}