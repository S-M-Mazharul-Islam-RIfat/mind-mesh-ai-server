"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const comment_service_1 = require("./comment.service");
const createCommentController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await comment_service_1.CommentServices.createComment(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Comment created successfully',
        data: result
    });
});
const getAllCommentsByThreadIdController = (0, catchAsync_1.default)(async (req, res) => {
    const { threadId } = req.params;
    const result = await comment_service_1.CommentServices.getAllCommentsByThreadId(threadId);
    res.status(200).json({
        success: true,
        message: 'Comments retrived successfully by thread id',
        data: result.nestedComments,
        meta: { commentsCount: result.total }
    });
});
exports.CommentControllers = {
    createCommentController,
    getAllCommentsByThreadIdController,
};
//# sourceMappingURL=comment.controller.js.map