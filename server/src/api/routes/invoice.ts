import { InvoiceInputDTO } from "@/interfaces/Invoice";
import { IError } from "@/interfaces/IError";
import InvoiceService from "@/services/invoice";
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
        '/invoice/add', 
        celebrate({
            body: Joi.object({
                title: Joi.string().required(),
                dueDate: Joi.date().required(),
                note: Joi.string().required(),
                clientId: Joi.string().required(),
                items: Joi.array().items(Joi.object({
                    productName: Joi.string().required(),
                    quantity: Joi.number().required(),
                    unitPrice: Joi.number().required(),
                    description: Joi.string().required()
                }))

            }),
        }),
        async (req: Request, res: Response, next: NextFunction) => {
        try {
            Logger.debug('Calling create invoice endpoint with body: %o', req.body);
            const InvoiceServiceInstance = new InvoiceService(req.currentUser?.userId as string)
            const response = await InvoiceServiceInstance.create(req.body as InvoiceInputDTO)
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

    route.get('/invoices/:invoiceId', async (req: Request, res: Response, next: NextFunction) => {
        try {
            Logger.debug('Calling get invoice by id endpoint with body: %o', req.body);
            const InvoiceServiceInstance = new InvoiceService(req.currentUser?.userId as string)
            const invoiceId = req.params.invoiceId as string
            const response = await InvoiceServiceInstance.getInvoiceById(invoiceId)
            return res.status(200).json({
                message: response
            })
        } catch (error) {
            const errorObject = error as IError;
            Logger.error('🔥 error: %o', errorObject.message);
            next(errorObject); 
        }
    })

    route.delete('/invoice/:invoiceId', async (req: Request, res: Response, next: NextFunction) => {
        try {
            Logger.debug('Calling delete invoice endpoint with body: %o', req.body);
            const InvoiceServiceInstance = new InvoiceService(req.currentUser?.userId as string)
            const invoiceId = req.params.invoiceId as string
            const response = await InvoiceServiceInstance.delete(invoiceId)
            return res.status(200).json({
                message: response
            })
        } catch (error) {
            const errorObject = error as IError;
            Logger.error('🔥 error: %o', errorObject.message);
            next(errorObject); 
        }
    })

    route.patch('/invoice/:invoiceId', async (req: Request, res: Response, next: NextFunction) => {
        try {
            Logger.debug('Calling update invoice endpoint with body: %o', req.body);
            const InvoiceServiceInstance = new InvoiceService(req.currentUser?.userId as string)
            const invoiceId = req.params.invoiceId as string
            const response = await InvoiceServiceInstance.updateInvoice(req.body, invoiceId)
            return res.status(200).json({
                message: response
            })
        } catch (error) {
            const errorObject = error as IError;
            Logger.error('🔥 error: %o', errorObject.message);

            next(errorObject); 
        }
    })

    route.get('/invoices', async (req: Request, res: Response, next: NextFunction) => {
        try {
            Logger.debug('Calling get invoices endpoint with body: %o', req.body);
            const InvoiceServiceInstance = new InvoiceService(req.currentUser?.userId as string)
            const response = await InvoiceServiceInstance.getCurrentUserInvoices(req.currentUser?.userId as string)
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