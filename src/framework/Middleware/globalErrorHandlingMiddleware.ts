import { Request, Response, NextFunction } from 'express';

const errorHandlerMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.log('hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii',err.statusCode)  
  console.error(err.stack,"hiiii");
  res.status(err.statusCode || 500).json({message:err.message});
};

export default errorHandlerMiddleware;
