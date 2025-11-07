import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { Request, Response } from "express";
import { ThreadServices } from "./thread.service";

const createThreadController = catchAsync(async (req: Request, res: Response) => {
   const result = await ThreadServices.createThread(req.body);
   sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Thread created successfully',
      data: result
   })
})

const getAllThreadController = catchAsync(async (req: Request, res: Response) => {
   const result = await ThreadServices.getAllThread();
   sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'All thread retrived successfully',
      data: result,
   })
})

const getSingleThreadController = catchAsync(async (req: Request, res: Response) => {
   const { id } = req.params;
   const result = await ThreadServices.getSingleThread(id!);
   sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Single thread retrived successfully',
      data: result
   })
})

export const ThreadControllers = {
   createThreadController,
   getAllThreadController,
   getSingleThreadController,
}