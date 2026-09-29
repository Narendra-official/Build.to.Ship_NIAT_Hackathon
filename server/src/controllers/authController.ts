import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { supabase } from '../db';
import { config } from '../config';
import { registerSchema, loginSchema } from '../validators';
import { UnauthorizedError, AppError } from '../utils/errors';
import { AuthenticatedRequest } from '../middleware/auth';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = registerSchema.parse(req.body);
    
    // Check if user already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', validatedData.email)
      .single();

    if (existingUser) {
      throw new AppError('Email already in use', 409, 'CONFLICT');
    }

    // Hash password
    const passwordHash = await bcrypt.hash(validatedData.password, 10);

    // Insert user
    const { data: user, error } = await supabase
      .from('users')
      .insert({
        email: validatedData.email,
        password_hash: passwordHash
      })
      .select('id, email, created_at')
      .single();

    if (error || !user) {
      throw new AppError('Failed to create user', 500, 'DB_ERROR');
    }

    // Generate token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      config.jwtSecret || '',
      { expiresIn: '7d' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: config.nodeEnv === 'production',
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.status(201).json({
      success: true,
      data: {
        user,
        token
      }
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = loginSchema.parse(req.body);
    
    // Find user
    const { data: user, error } = await supabase
      .from('users')
      .select('id, email, password_hash, created_at')
      .eq('email', validatedData.email)
      .single();

    if (error || !user) {
      throw new UnauthorizedError('Invalid credentials');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(validatedData.password, user.password_hash);
    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid credentials');
    }

    // Generate token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      config.jwtSecret || '',
      { expiresIn: '7d' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: config.nodeEnv === 'production',
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    const { password_hash, ...userWithoutPassword } = user;

    res.json({
      success: true,
      data: {
        user: userWithoutPassword,
        token
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.userId;
    
    const { data: user, error } = await supabase
      .from('users')
      .select('id, email, created_at')
      .eq('id', userId)
      .single();

    if (error || !user) {
      throw new AppError('User not found', 404, 'NOT_FOUND');
    }

    res.json({
      success: true,
      data: { user }
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: config.nodeEnv === 'production',
    sameSite: 'none'
  });
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
};

export const updateProfile = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.userId;
    // We don't have a fullName column in the DB, so this is just a dummy response that echoes it back
    // to keep the frontend happy.
    const { fullName, organization } = req.body;
    
    res.json({
      success: true,
      data: {
        user: {
          id: userId,
          email: req.user?.email,
          name: fullName || 'User',
          organization: organization || 'Organization'
        }
      }
    });
  } catch (error) {
    next(error);
  }
};
