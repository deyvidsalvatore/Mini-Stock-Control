import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { Payload } from '../models/user/auth/Payload';

export function isAuthenticated(req: Request, res: Response, next: NextFunction): void {
    const authToken = req.headers.authorization;

    if (!authToken) {
        res.status(401).end();
    }

    const token = authToken.split(" ")[1];

    if (!token) {
        res.status(401).end();
    }

    try {
        const { sub } = verify(token, process.env.JWT_SECRET as string) as Payload;
        req.user_id = sub;
        next();
    } catch (error) {
        res.status(401).end();
    }
}
