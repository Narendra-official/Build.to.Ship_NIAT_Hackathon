import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../utils/errors';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      error: err.message
    });
  }

  if (err instanceof ZodError) {
    const messages = err.issues.map(i => i.message).join(', ');
    return res.status(400).json({
      success: false,
      error: `Validation Error: ${messages}`
    });
  }

  console.error('Unhandled Error:', err);

  return res.status(500).json({
    success: false,
    error: 'An unexpected error occurred'
  });
};
