import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import status from "http-status";
import { CommentServices } from "./comment.service";

const createCommentController = catchAsync(async (req: Request, res: Response) => {
   const result = await CommentServices.createComment(req.body);

   sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Comment created successfully',
      data: result
   })
})

const getAllCommentsByThreadIdController = catchAsync(async (req: Request, res: Response) => {
   const { threadId } = req.params;
   const result = await CommentServices.getAllCommentsByThreadId(threadId!);
   res.status(200).json({
      success: true,
      message: 'Comments retrived successfully by thread id',
      data: result.nestedComments,
      meta: { commentsCount: result.total }
   })
})

export const CommentControllers = {
   createCommentController,
   getAllCommentsByThreadIdController,
}