"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.aiControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const ai_service_1 = require("./ai.service");
const generateThreadSummaryController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await ai_service_1.aiServices.generateThreadSummary(req.body.threadBody);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Thread summary is generated successfully',
        data: result
    });
});
exports.aiControllers = {
    generateThreadSummaryController
};
//# sourceMappingURL=ai.controller.js.map