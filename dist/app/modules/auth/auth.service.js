"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("../user/user.model");
const auth_utils_1 = require("./auth.utils");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongodb_1 = require("mongodb");
const bcrypt_1 = __importDefault(require("bcrypt"));
const signup = async (payload) => {
    const userData = { ...payload };
    userData.memberSince = new Date().toISOString().split('T')[0];
    const newUser = await user_model_1.UserModel.create(userData);
    return newUser;
};
const login = async (payload) => {
    // checking if the user is exist
    const user = await user_model_1.UserModel.isUserExistsByEmail(payload?.email);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    // checking if the user is already deleted
    const isDeleted = user?.isDeleted;
    if (isDeleted) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'This user is deleted');
    }
    // check if the user is blocked or not
    const userStatus = user?.status;
    if (userStatus === 'blocked') {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'This user is blocked');
    }
    // check if the password is correct
    const passwordMatched = await user_model_1.UserModel.isPasswordMatched(payload?.password, user?.password);
    if (!passwordMatched) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'Password is not matched');
    }
    // create token
    const jwtPayload = {
        id: String(user._id),
        fullName: user.fullName,
        userName: user.userName,
        email: user.email,
        role: user.role,
        memberSince: user.memberSince
    };
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    const refreshToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_refresh_secret, config_1.default.jwt_refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
};
const refreshToken = async (token) => {
    // if the token is valid or not
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_refresh_secret);
    const { email, iat } = decoded;
    // checking if the user is exist
    const user = await user_model_1.UserModel.isUserExistsByEmail(email);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    // checking if the user is already deleted
    const isDeleted = user?.isDeleted;
    if (isDeleted) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'This user is deleted');
    }
    // check if the user is blocked or not
    const userStatus = user?.status;
    if (userStatus === 'blocked') {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'This user is blocked');
    }
    // create token and sent to the client
    const jwtPayload = {
        id: String(user._id),
        fullName: user.fullName,
        userName: user.userName,
        email: user.email,
        role: user.role,
        memberSince: user.memberSince
    };
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    return {
        accessToken
    };
};
const changeUserInfo = async (payload) => {
    // checking if the user is exist
    const user = await user_model_1.UserModel.isUserExistsByEmail(payload?.email);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    // checking if the user is already deleted
    const isDeleted = user?.isDeleted;
    if (isDeleted) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'This user is deleted');
    }
    // check if the user is blocked or not
    const userStatus = user?.status;
    if (userStatus === 'blocked') {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'This user is blocked');
    }
    // check if the password is correct
    const passwordMatched = await user_model_1.UserModel.isPasswordMatched(payload?.password, user?.password);
    if (!passwordMatched) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'Password is not matched');
    }
    const result = await user_model_1.UserModel.findOneAndUpdate({ _id: new mongodb_1.ObjectId(payload.id) }, {
        fullName: payload.fullName,
        userName: payload.userName,
        email: payload.email,
    });
    // create token and sent to the client
    const jwtPayload = {
        id: result?._id,
        fullName: result?.fullName,
        userName: result?.userName,
        email: result?.email,
        role: result?.role,
        memberSince: result?.memberSince
    };
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    const refreshToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_refresh_secret, config_1.default.jwt_refresh_expires_in);
    return { accessToken, refreshToken, result };
};
const changePassword = async (payload) => {
    // checking if the user is exist
    const user = await user_model_1.UserModel.isUserExistsByEmail(payload?.email);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    // checking if the password is correct
    if (!(await user_model_1.UserModel.isPasswordMatched(payload.oldPassword, user?.password)))
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'Password do not matched');
    // hash new password
    const newHashedPassword = await bcrypt_1.default.hash(payload.newPassword, Number(config_1.default.bcrypt_salt_rounds));
    await user_model_1.UserModel.findOneAndUpdate({ _id: new mongodb_1.ObjectId(payload.id) }, {
        password: newHashedPassword,
        passwordChangedAt: new Date(),
    });
    return null;
};
exports.AuthServices = {
    signup,
    login,
    refreshToken,
    changeUserInfo,
    changePassword
};
//# sourceMappingURL=auth.service.js.map