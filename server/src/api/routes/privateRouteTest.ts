import { NextFunction, Request, Response, Router } from "express";
import confirmAuthentication from "../middlewares/confirmAuthentication";
import setCurrentUser from "../middlewares/setCurrentUser";

const route = Router()
export default (app: Router) => {

    app.use('/private', confirmAuthentication, setCurrentUser, route)

    route.get('/', (req: Request, res: Response, next: NextFunction) => {
        return res.status(200).json({
            message: 'Hello from Private Route'
        })
    })
}   