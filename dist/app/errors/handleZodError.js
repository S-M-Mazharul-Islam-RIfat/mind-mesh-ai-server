"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const handleZodError = (err) => {
    const errorSources = err.issues.map((issue) => {
        return {
            path: issue?.path[issue.path.length - 1],
            message: issue.message
        };
    });
    const statusCode = http_status_1.default.BAD_REQUEST;
    return {
        statusCode,
        message: "Validation Error",
        errorSources
    };
};
exports.default = handleZodError;
//# sourceMappingURL=handleZodError.js.map