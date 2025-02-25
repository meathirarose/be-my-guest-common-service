import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "../errors/NotAuthorizedError";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

console.log(process.env.ACCESS_SECRET, "hello access secret---------------------------------------------------------------------->");

interface UserPayload {
    id: string,
    email: string
}

declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload;
        }
    }
}

export const requireAuth = (
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
      const token = req.cookies.accessToken;
    
        if(!token){
            return next();
        }
    
        try {
            const payload = jwt.verify(token, process.env.ACCESS_SECRET!) as UserPayload;
            req.currentUser = payload;
    
        } catch (error) {
            console.log("JWT verification failed", error);
            throw new NotAuthorizedError();
        }
    next();
}