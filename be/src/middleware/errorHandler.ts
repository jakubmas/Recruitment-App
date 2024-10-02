import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: Error, req: Request, res: Response) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Server Error',
    message: err.message,
  });
};

export default errorHandler;
