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

const addLikeInCommentController = catchAsync(async (req: Request, res: Response) => {
   const { commentId } = req.params;
   const { userId } = req.body;
   const result = await CommentServices.addLikeInComment(commentId!, userId!);

   sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Like added successfully',
      data: result
   })
})

const removeLikeFromCommentController = catchAsync(async (req: Request, res: Response) => {
   const { commentId } = req.params;
   const { userId } = req.body;
   const result = await CommentServices.removeLikeFromComment(commentId!, userId!);

   sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Like removed successfully',
      data: result
   })
})

export const CommentControllers = {
   createCommentController,
   getAllCommentsByThreadIdController,
   addLikeInCommentController,
   removeLikeFromCommentController
}