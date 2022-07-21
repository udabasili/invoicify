import { Request, Response, Router } from "express";
import confirmAuthentication from "../middlewares/confirmAuthentication";
import setCurrentUser from "../middlewares/setCurrentUser";

const route = Router()

export default (app: Router) => {
    app.use('/user/:userId', confirmAuthentication, setCurrentUser, route)

    route.get('/me', (req: Request, res: Response) => res.status(200).json({ message: req.currentUser}))
}