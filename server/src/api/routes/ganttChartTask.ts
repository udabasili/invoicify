import { Router } from "express";
import confirmAuthentication from "../middlewares/confirmAuthentication";
import setCurrentUser from "../middlewares/setCurrentUser";

const route = Router()
export default (app: Router) => {
    app.use('/user/:userId', confirmAuthentication, setCurrentUser, route)

   

}