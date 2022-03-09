import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import { NotAuthorizedErro } from '../errors/not-authorized-error';

interface UserPayload {
    id: string;
    email: string;
}

declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload;
        }
    }
}
export const requireAuth = (
    req:Request, 
    res:Response, 
    next: NextFunction
    )=>{

        if(!req.currentUser){
            throw new NotAuthorizedErro('Yo are not Authorized');
        }
        next();
        
    };