"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const user_model_1 = require("./user.model");
const getUserInfoByUserId = async (id) => {
    const userInfo = await user_model_1.UserModel.findById(id);
    return userInfo;
};
exports.UserServices = {
    getUserInfoByUserId
};
//# sourceMappingURL=user.service.js.map