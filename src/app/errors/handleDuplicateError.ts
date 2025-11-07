import status from 'http-status';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const handleDuplicateError = (err: any): TGenericErrorResponse => {
   const match = err.message.match(/"([^"]*)"/);
   const extractedMessage = match && match[1];

   const errorSources: TErrorSources = [
      {
         path: '',
         message: `${extractedMessage} is already exists`,
      },
   ];

   const statusCode = status.BAD_REQUEST;

   return {
      statusCode,
      message: 'Duplication Error',
      errorSources,
   };
};

export default handleDuplicateError;