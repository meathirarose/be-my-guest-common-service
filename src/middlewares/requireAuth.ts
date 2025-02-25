import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "../errors/NotAuthorizedError";
import jwt from 'jsonwebtoken';

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
      const secret = "mySuperJWTkeySecret940611"
    
        if(!token){
            return next();
        }
    
        try {
            const payload = jwt.verify(token, secret) as UserPayload;
            req.currentUser = payload;
    
        } catch (error) {
            throw new NotAuthorizedError();
            console.log("JWT verification failed", error);
        }
    next();
}