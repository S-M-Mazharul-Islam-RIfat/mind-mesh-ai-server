"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const auth_service_1 = require("./auth.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../config"));
const signupUserController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await auth_service_1.AuthServices.signup(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User signup successfully',
        data: result
    });
});
const loginUserController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await auth_service_1.AuthServices.login(req.body);
    const { accessToken, refreshToken } = result;
    res.cookie('refreshToken', refreshToken, {
        secure: config_1.default.NODE_ENV === 'production',
        httpOnly: true
    });
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User logged in successfully',
        data: {
            accessToken,
        }
    });
});
const refreshTokenController = (0, catchAsync_1.default)(async (req, res) => {
    const { refreshToken } = req.cookies;
    const result = await auth_service_1.AuthServices.refreshToken(refreshToken);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Access token is retrived successfully',
        data: result
    });
});
const changeUserInfoController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await auth_service_1.AuthServices.changeUserInfo(req.body);
    const { accessToken, refreshToken } = result;
    res.cookie('refreshToken', refreshToken, {
        secure: config_1.default.NODE_ENV === 'production',
        httpOnly: true
    });
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User info changed successfully',
        data: {
            accessToken,
        }
    });
});
const changePasswordController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await auth_service_1.AuthServices.changePassword(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Password is updated succesfully!',
        data: result,
    });
});
exports.AuthControllers = {
    signupUserController,
    loginUserController,
    refreshTokenController,
    changeUserInfoController,
    changePasswordController
};
//# sourceMappingURL=auth.controller.js.map