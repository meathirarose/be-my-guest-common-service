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
    
        if(!token){
            return next();
        }
    
        try {
            const payload = jwt.verify(token, "mySuperJWTkeySecret940611") as UserPayload;
            console.log(payload,"common============================================")
            req.currentUser = payload;
    
        } catch (error) {
            console.log("JWT verification failed", error);
            throw new NotAuthorizedError();
        }
    next();
}