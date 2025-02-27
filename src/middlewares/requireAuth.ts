import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "../errors/NotAuthorizedError";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import { CustomError } from "../errors/CustomError";
import { ForbiddenError } from "../errors/ForbiddenError";
import { UserPayload } from "../functions/jwt";

dotenv.config();

declare module 'express-serve-static-core' {
    interface Request {
        currentUser?: UserPayload;
    }
  }

export const requireAuth = (
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
      const token = req.cookies.accessToken;
      const secret = process.env.ACCESS_SECRET as string;
      if (!secret) return next(new Error("Can't access ACCESS_SECRET in requireAuth"));
      if (!token) return next(new NotAuthorizedError());
    try {
        const user = jwt.verify(token, secret) as UserPayload;
        if (!user) return next(new NotAuthorizedError());
        req.currentUser = user;
        next();
    } catch (error) {
        if (error instanceof CustomError) {
            return next(error);
        }
        return next(new ForbiddenError());
    }
}