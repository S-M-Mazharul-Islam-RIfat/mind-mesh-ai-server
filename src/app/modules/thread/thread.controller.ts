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
   const page = Number(req.query.page) || 1;
   const limit = Number(req.query.limit) || 5;
   const search = String(req.query.search) || '';
   const result = await ThreadServices.getAllThread({ page, limit, search });
   res.status(200).json({
      success: true,
      message: 'All thread retrived successfully',
      data: result.threads,
      meta: { totalPages: result.totalPages, total: result.total }
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