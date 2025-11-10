"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThreadControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const thread_service_1 = require("./thread.service");
const createThreadController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await thread_service_1.ThreadServices.createThread(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Thread created successfully',
        data: result
    });
});
const getAllThreadController = (0, catchAsync_1.default)(async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const search = String(req.query.search) || '';
    const result = await thread_service_1.ThreadServices.getAllThread({ page, limit, search });
    res.status(200).json({
        success: true,
        message: 'All thread retrived successfully',
        data: result.threads,
        meta: { totalPages: result.totalPages, total: result.total }
    });
});
const getSingleThreadController = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const result = await thread_service_1.ThreadServices.getSingleThread(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Single thread retrived successfully',
        data: result
    });
});
exports.ThreadControllers = {
    createThreadController,
    getAllThreadController,
    getSingleThreadController,
};
//# sourceMappingURL=thread.controller.js.map