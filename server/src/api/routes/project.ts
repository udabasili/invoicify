import { IProjectInputDTO } from "@/interfaces/IProject";
import { IError } from "@/interfaces/IError";
import ProjectService from "@/services/project";
import { celebrate, Joi } from "celebrate";
import { NextFunction, Request, Response, Router } from "express";
import { SequelizeScopeError, ValidationError } from "sequelize";
import confirmAuthentication from "../middlewares/confirmAuthentication";
import setCurrentUser from "../middlewares/setCurrentUser";
import { IGanttChartTaskDTO } from "@/interfaces/GanttChartTask";
import GanttChartTaskService from "@/services/ganttChartTask";
import Logger from "@/loaders/logger";

const route = Router()
export default (app: Router) => {
    app.use('/user/:userId', confirmAuthentication, setCurrentUser, route)

    route.post(
        '/project/add',
        celebrate({
            body: Joi.object({
                projectName: Joi.string().required(),
                summary: Joi.string().required(),
                dueDate: Joi.date().required(),
                clientId: Joi.string().required(),
            }),
        }),
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                Logger.debug('Calling project add endpoint with body: %o', req.body);
                const projectServiceInstance = new ProjectService(req.currentUser?.userId as string)
                const response = await projectServiceInstance.create(req.body)
                return res.status(200).json({
                    message: response
                })
            } catch (error) {
                const errorObject = error as SequelizeScopeError;
                if (error instanceof ValidationError) {
                    errorObject.message = error.errors[0].message
                }
                Logger.error('🔥 error: %o', errorObject.message);
                next(errorObject);
            }
        })

    route.delete(
        '/project/:projectId/delete',
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                Logger.debug('Calling project delete endpoint with body: %o', req.body);

                const projectServiceInstance = new ProjectService(req.currentUser?.userId as string)
                await projectServiceInstance.deleteProject(req.params.projectId as string)
                return res.status(200).json({
                    message: 'Success'
                })
            } catch (error) {
                const errorObject = error as SequelizeScopeError;
                if (error instanceof ValidationError) {
                    errorObject.message = error.errors[0].message
                }
                Logger.error('🔥 error: %o', errorObject.message);
                next(errorObject);
            }
        })
    route.patch(
        '/project/:projectId/update',
        celebrate({
            body: Joi.object({
                projectName: Joi.string(),
                summary: Joi.string(),
                dueDate: Joi.date(),
                clientId: Joi.string(),
                projectId: Joi.string(),
                status: Joi.string()
            }),
        }),
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                Logger.debug('Calling project update endpoint with body: %o', req.body);
                const projectServiceInstance = new ProjectService(req.currentUser?.userId as string)
                await projectServiceInstance.updateProjectProject(req.params.projectId as string, req.body)
                return res.status(200).json({
                    message: 'Success'
                })
            } catch (error) {
                const errorObject = error as SequelizeScopeError;
                if (error instanceof ValidationError) {
                    errorObject.message = error.errors[0].message
                }
                Logger.error('🔥 error: %o', errorObject.message);
                next(errorObject);
            }
        })


    route.get('/projects', async (req: Request, res: Response, next: NextFunction) => {
        try {
            Logger.debug('Calling  get all projects endpoint with body: %o');

            const projectServiceInstance = new ProjectService(req.currentUser?.userId as string)
            const response = await projectServiceInstance.getCurrentUserProjects(req.currentUser?.userId as string)
            return res.status(200).json({
                message: response
            })
        } catch (error) {
            const errorObject = error as IError;
            Logger.error('🔥 error: %o', errorObject.message);
            next(errorObject);
        }
    })

    route.post(
        '/project/:projectId/gantt-tasks/add',
        celebrate({
            body: Joi.array().items(Joi.object({
                id: Joi.number().required(),
                parentId: Joi.number().required(),
                successorId: Joi.number().optional(),
                title: Joi.string().required(),
                start: Joi.date().required(),
                end: Joi.date().required(),
                duration: Joi.number().optional(),
                projectId: Joi.string().optional(),
                completed: Joi.boolean().optional(),
                progress: Joi.number().optional(),

            }))
        }),
        async (req: Request, res: Response, next: NextFunction) => {
            Logger.debug('Calling  create gantt chart tasks endpoint with body: %o');
            try {
                const GanttTaskServiceInstance = new GanttChartTaskService(req.params.projectId as string)
                const response = await GanttTaskServiceInstance.create(req.body as IGanttChartTaskDTO[],)
                return res.status(200).json({
                    message: response
                })
            } catch (error) {
                const errorObject = error as SequelizeScopeError;
                if (error instanceof ValidationError) {
                    errorObject.message = error.errors[0].message
                }
                Logger.error('🔥 error: %o', errorObject.message);
                next(errorObject);
            }
        })

    route.put(
        '/project/:projectId/gantt-tasks/:ganttTaskId/update',
        celebrate({
            body: Joi.object({
                completed: Joi.boolean().optional(),
                parentId: Joi.number()
            })
        }),
        async (req: Request, res: Response, next: NextFunction) => {
            Logger.debug('Calling  update gantt chart tasks endpoint with body: %o');

            try {
                const GanttTaskServiceInstance = new GanttChartTaskService(req.params.projectId as string)
                const ganttTaskId = req.params.ganttTaskId
                const response = await GanttTaskServiceInstance.update(req.body, ganttTaskId)
                return res.status(200).json({
                    message: response
                })
            } catch (error) {
                const errorObject = error as SequelizeScopeError;
                if (error instanceof ValidationError) {
                    errorObject.message = error.errors[0].message
                }
                Logger.error('🔥 error: %o', errorObject.message);
                next(errorObject);
            }
        })

    route.delete(
        '/project/:projectId/gantt-tasks/:ganttTaskId/delete',
        celebrate({
            body: Joi.object({
                completed: Joi.boolean().optional(),
                parentId: Joi.number()
            })
        }),
        async (req: Request, res: Response, next: NextFunction) => {
            Logger.debug('Calling  delete gantt chart tasks endpoint with body: %o');

            try {
                const GanttTaskServiceInstance = new GanttChartTaskService(req.params.projectId as string)
                const ganttTaskId = req.params.ganttTaskId
                const response = await GanttTaskServiceInstance.delete(ganttTaskId)
                return res.status(200).json({
                    message: response
                })
            } catch (error) {
                const errorObject = error as SequelizeScopeError;
                if (error instanceof ValidationError) {
                    errorObject.message = error.errors[0].message
                }
                Logger.error('🔥 error: %o', errorObject.message);

                next(errorObject);
            }
        })

    route.get('/project/:projectId/gantt-tasks', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const GanttTaskServiceInstance = new GanttChartTaskService(req.params.projectId as string)
            const response = await GanttTaskServiceInstance.getProjectGanttCharts()
            return res.status(200).json({
                message: response
            })
        } catch (error) {
            const errorObject = error as IError;
            next(errorObject);
        }
    })

}