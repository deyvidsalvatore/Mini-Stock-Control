import { NextFunction, Request, Response } from 'express';
import { verify } from "jsonwebtoken";
import { Payload } from '../models/user/auth/Payload';

export function isAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authToken = request.headers.authorization;
    
    if (!authToken) {
        return response.status(401).end();
    }

    const [_, token] = authToken.split(" ");

    try {
        const { sub } = verify(token, process.env.JWT_SECRET as string) as Payload;
        request.user_id = sub;
        return next();
    } catch (error) {
        return response.status(401).end();
    }
    
}