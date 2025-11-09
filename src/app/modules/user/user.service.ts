import { UserModel } from "./user.model"

const getUserInfoByUserId = async (id: string) => {
   const userInfo = await UserModel.findById(id);
   return userInfo;
}

export const UserServices = {
   getUserInfoByUserId
}