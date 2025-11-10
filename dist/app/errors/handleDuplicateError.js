"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const handleDuplicateError = (err) => {
    const match = err.message.match(/"([^"]*)"/);
    const extractedMessage = match && match[1];
    const errorSources = [
        {
            path: '',
            message: `${extractedMessage} is already exists`,
        },
    ];
    const statusCode = http_status_1.default.BAD_REQUEST;
    return {
        statusCode,
        message: 'Duplication Error',
        errorSources,
    };
};
exports.default = handleDuplicateError;
//# sourceMappingURL=handleDuplicateError.js.map