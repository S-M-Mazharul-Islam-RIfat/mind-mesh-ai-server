import { TErrorSources, TGenericErrorResponse } from "../interface/error";
import status from "http-status";

const handleZodError = (err: any): TGenericErrorResponse => {
   const errorSources: TErrorSources = err.issues.map((issue: any) => {
      return {
         path: issue?.path[issue.path.length - 1],
         message: issue.message
      }
   })

   const statusCode = status.BAD_REQUEST;
   return {
      statusCode,
      message: "Validation Error",
      errorSources
   }
}

export default handleZodError;