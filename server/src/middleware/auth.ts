import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { UnauthorizedError } from '../utils/errors';
import { JwtPayload } from '../types';

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

export const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  let token = req.cookies?.token;
  
  if (!token) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }
  }

  if (!token) {
    return next(new UnauthorizedError('Missing or invalid authorization header/cookie'));
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret || '') as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    return next(new UnauthorizedError('Invalid or expired token'));
  }
};
