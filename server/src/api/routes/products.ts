import { IProductInputDTO } from "@/interfaces/IProduct";
import { IError } from "@/interfaces/IError";
import ProductService from "@/services/product";
import { celebrate, Joi } from "celebrate";
import { NextFunction, Request, Response, Router } from "express";
import { SequelizeScopeError, ValidationError } from "sequelize";
import confirmAuthentication from "../middlewares/confirmAuthentication";
import setCurrentUser from "../middlewares/setCurrentUser";
import Logger from "@/loaders/logger";

const route = Router()
export default (app: Router) => {
    app.use('/user/:userId', confirmAuthentication, setCurrentUser, route)

    route.post(
        '/product/add', 
        celebrate({
            body: Joi.object({
                title: Joi.string().required(),
                features: Joi.string(),
                price: Joi.number().required(),
            }),
        }),
        async (req: Request, res: Response, next: NextFunction) => {
        try {
            Logger.debug('Calling create products endpoint with body: %o', req.body);
            const productServiceInstance = new ProductService(req.currentUser?.userId as string)
            const response = await productServiceInstance.create(req.body as IProductInputDTO)
            return res.status(200).json({
                message: response
            })
        } catch (error) {
            const errorObject = error as SequelizeScopeError; 
            if (error instanceof ValidationError){
                errorObject.message = error.errors[0].message
            }
            Logger.error('🔥 error: %o', errorObject.message);
            next(errorObject); 
        }
    })

    route.get('/products', async (req: Request, res: Response, next: NextFunction) => {
        try {
            Logger.debug('Calling get products endpoint with body: %o', req.body);
            const productServiceInstance = new ProductService(req.currentUser?.userId as string)
            const response = await productServiceInstance.getCurrentUserProducts(req.currentUser?.userId as string)
            return res.status(200).json({
                message: response
            })
        } catch (error) {
            const errorObject = error as IError;
            Logger.error('🔥 error: %o', errorObject.message);
            next(errorObject); 
        }
    })

}