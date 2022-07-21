import Logger from "@/loaders/logger";
import AuthService from "@/services/auth";
import { NextFunction, Request, Response, Router } from "express";
import { ErrorHandlerProps } from "../middlewares/errorHandler";


const route = Router()
export default (app: Router) => {
    app.use('/token', route)

    route.get('/refresh', async (req: Request, res: Response, next: NextFunction) => {
        try {
            Logger.debug('Calling refresh token endpoint with body: %o', req.body );
            const today = new Date()
            let refreshToken = req.cookies['x-token-refresh'] || ''
            const accessToken = await AuthService.reIssueToken(refreshToken)            
            today.setHours(today.getHours() + 1);
            const sevenHoursFromNow = today;
            res.cookie("x-token", accessToken, {
            expires: sevenHoursFromNow, // 1 hour
            secure: process.env.NODE_ENV === "production", // set to true if your using https
            httpOnly: true,
            });
            return res.status(200).json({})
        } catch (error) {
            const errorObject = error as ErrorHandlerProps
            return next({
                message: errorObject.message,
                status: 401
            })
        }
    })
}