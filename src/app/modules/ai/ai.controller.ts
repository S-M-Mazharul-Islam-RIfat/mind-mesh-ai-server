import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { aiServices } from "./ai.service";

const generateThreadSummaryController = catchAsync(async (req, res) => {
   console.log(req.body);
   const result = await aiServices.generateThreadSummary(req.body.threadBody);
   sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Thread summary is generated successfully',
      data: result
   })
})

export const aiControllers = {
   generateThreadSummaryController
}