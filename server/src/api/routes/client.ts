import { ClientAttributes, IClientInputDTO } from "@/interfaces/IClient";
import { IError } from "@/interfaces/IError";
import Logger from "@/loaders/logger";
import ClientService from "@/services/client";
import { celebrate, Joi } from "celebrate";
import { NextFunction, Request, Response, Router } from "express";
import { SequelizeScopeError, ValidationError } from "sequelize";
import confirmAuthentication from "../middlewares/confirmAuthentication";
import setCurrentUser from "../middlewares/setCurrentUser";

const route = Router()
export default (app: Router) => {
    app.use('/user/:userId', confirmAuthentication, setCurrentUser, route)

    route.post(
        '/client/add', 
        celebrate({
            body: Joi.object({
                name: Joi.string().required(),
                email: Joi.string().email(),
                address: Joi.string().required(),
                city: Joi.string().required(),
                country: Joi.string().required(),
            }),
        }),
        async (req: Request, res: Response, next: NextFunction) => {
        try {
            Logger.debug('Calling create client endpoint with body: %o', req.body);
            const clientServiceInstance = new ClientService(req.currentUser?.userId as string)
            const response = await clientServiceInstance.create(req.body as IClientInputDTO)
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

    route.patch(
        '/client/:clientId/update', 
        celebrate({
            body: Joi.object({
                name: Joi.string(),
                email: Joi.string(),
                address: Joi.string(),
                city: Joi.string(),
                country: Joi.string(),
            }),
        }),
        async (req: Request, res: Response, next: NextFunction) => {
        try {
            Logger.debug('Calling update client endpoint with body: %o', req.body);
            const clientServiceInstance = new ClientService(req.currentUser?.userId as string)
            const userId = req.params.clientId
            const response = await clientServiceInstance.updateClient(req.body as ClientAttributes, userId)
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

    route.delete(
        '/client/:clientId/delete', 
        async (req: Request, res: Response, next: NextFunction) => {
        try {
            Logger.debug('Calling delete client endpoint with body: %o', req.body);
            const clientServiceInstance = new ClientService(req.currentUser?.userId as string)
            const userId = req.params.clientId
            const response = await clientServiceInstance.delete(userId)
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

    route.get('/clients', async (req: Request, res: Response, next: NextFunction) => {
        try {
            Logger.debug('Calling get all clients endpoint with body: %o', req.body);
            const clientServiceInstance = new ClientService(req.currentUser?.userId as string)
            const response = await clientServiceInstance.getCurrentUserClients(req.currentUser?.userId as string)
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