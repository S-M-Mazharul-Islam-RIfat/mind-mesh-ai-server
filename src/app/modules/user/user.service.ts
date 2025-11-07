import { UserModel } from "./user.model"

const getUserInfoByUserName = async (id: string) => {
   const userInfo = await UserModel.findById(id);
   return userInfo;
}

export const UserServices = {
   getUserInfoByUserName
}