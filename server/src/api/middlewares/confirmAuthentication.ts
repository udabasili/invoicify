import config from '@/config';
import { NextFunction, Request, Response } from 'express';
import { ErrorHandler } from './errorHandler';
import jwt, { TokenExpiredError } from 'jsonwebtoken'
import Logger from '@/loaders/logger';


interface JwtPayload extends jwt.JwtPayload {
    id: string
}

export const getTokenFromCookie = (req: Request) => {
    let accessToken = req.cookies['x-token'] || '';
    return accessToken
}

const catchError = (err: ErrorHandler, res: Response) => {
    if (err instanceof TokenExpiredError) {
        err.message = "JWT Expired"
    }
    err.message = "UnAuthorized Access"
}


const confirmAuthentication = async (req: Request, res: Response, next: NextFunction) => {
    try {
        Logger.debug('Verifying Token')
        let accessToken = getTokenFromCookie(req);
        if (!accessToken) {
            throw new Error('Unauthorized')
        }
        const decode: JwtPayload = await jwt.verify(accessToken, config.secretKey as string) as JwtPayload
        req.userId = decode.userId
        return next()
        
    } catch (error) {
        const errorObject = error as ErrorHandler
        catchError(errorObject, res)
        return next({
            message: errorObject.message,
            status: 401
        })
    }
}

export default confirmAuthentication

