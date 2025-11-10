"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const signupValidationSchema = zod_1.default.object({
    body: zod_1.default.object({
        fullName: zod_1.default.string(),
        userName: zod_1.default.string(),
        email: zod_1.default.string(),
        password: zod_1.default.string(),
    })
});
const loginValidationSchema = zod_1.default.object({
    body: zod_1.default.object({
        email: zod_1.default.string(),
        password: zod_1.default.string(),
    })
});
const refreshTokenValidationSchema = zod_1.default.object({
    cookies: zod_1.default.object({
        refreshToken: zod_1.default.string().min(1, "Refresh token is required")
    })
});
const changeUserInfoValidationSchema = zod_1.default.object({
    body: zod_1.default.object({
        id: zod_1.default.string(),
        fullName: zod_1.default.string().optional(),
        userName: zod_1.default.string().optional(),
        email: zod_1.default.string().optional(),
        password: zod_1.default.string().optional(),
    })
});
const changePasswordValidationSchema = zod_1.default.object({
    body: zod_1.default.object({
        id: zod_1.default.string(),
        email: zod_1.default.string(),
        oldPassword: zod_1.default.string(),
        newPassword: zod_1.default.string()
    })
});
exports.AuthValidation = {
    signupValidationSchema,
    loginValidationSchema,
    refreshTokenValidationSchema,
    changeUserInfoValidationSchema,
    changePasswordValidationSchema
};
//# sourceMappingURL=auth.validation.js.map