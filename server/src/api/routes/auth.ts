import { NextFunction, Request, Response, Router } from "express";
import Logger from "@/loaders/logger";
import { IError } from "@/interfaces/IError";
import AuthService from "@/services/auth";
import { IUserInputDTO, LoginDTO } from "@/interfaces/IUser";
import { Joi, celebrate} from 'celebrate';
import { ValidationError } from "sequelize";

const route = Router();

export default (app: Router) => {
  app.use("/auth", route);

  route.post(
    "/register",
    celebrate({
        body: Joi.object({
            name: Joi.string().required(),
            companyName: Joi.string().required(),
            email: Joi.string().email(),
            password: Joi.string().required(),
            address: Joi.string().required(),
            city: Joi.string().required(),
            confirmPassword: Joi.string(),
            country: Joi.string().required(),
            logo: Joi.string().allow('').optional()
        }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      let today = new Date();
      Logger.debug("Calling Sign-Up endpoint with body: %o", req.body);
      try {
        const authServiceInstance = new AuthService();
        delete req.body.confirmPassword
        const { user, token } = await authServiceInstance.signUp(
          req.body as IUserInputDTO
        );
        const { accessToken, refreshToken } = token;
        today.setHours(today.getHours() + 2);
        const sevenHoursFromNow = today;
        res.cookie("x-token", accessToken, {
          expires: sevenHoursFromNow, // 1 hour
          // secure: process.env.NODE_ENV === "production", // set to true if your using https
          httpOnly: true,
        });

        today = new Date();
        today.setDate(today.getDate() + 7);
        const sevenDaysFromNow = today;
        res.cookie("x-token-refresh", refreshToken, {
          expires: sevenDaysFromNow, //7 days
          // secure: process.env.NODE_ENV === "production", // set to true if your using https
          httpOnly: true,
        });
        return res.status(201).json({ message: user });
      } catch (error) {
        const errorObject = error as IError;
          if (error instanceof ValidationError){
              errorObject.message = error.errors[0].message
          }
        Logger.error(errorObject.message);
        next({
          message: errorObject.message,
          status: errorObject.status || 401,
        });
      }
    }
  );

  route.post(
    "/login",
    celebrate({
        body: Joi.object({
            email: Joi.string().email(),
            password: Joi.string().required(),
        }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      let today = new Date();
      Logger.debug("Calling Login endpoint with body: %o", req.body);

      try {
        const authServiceInstance = new AuthService();
        const { user, token } = await authServiceInstance.login(
          req.body as LoginDTO
        );
        const { accessToken, refreshToken } = token;
        today.setHours(today.getHours() + 2);
        const sevenHoursFromNow = today;
        res.cookie("x-token", accessToken, {
          expires: sevenHoursFromNow, // 7 hour
          // secure: process.env.NODE_ENV === "production", // set to true if your using https
          httpOnly: true,
        });

        today = new Date();
        today.setDate(today.getDate() + 7);
        const sevenDaysFromNow = today;
        res.cookie("x-token-refresh", refreshToken, {
          expires: sevenDaysFromNow, //7 days
          // secure: process.env.NODE_ENV === "production", // set to true if your using https
          httpOnly: true,
        });
        return res.status(201).json({ message: user });
      } catch (error) {
        const errorObject = error as IError;
        if (error instanceof ValidationError){
          errorObject.message = error.errors[0].message
      }
        Logger.error(errorObject.message);
        next({
          message: errorObject.message,
          status: errorObject.status || 401,
        });
      }
    }
  )

  
  route.get(
    "/logout",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        res.clearCookie('x-token')
        res.clearCookie('x-token-refresh')
        return res.status(201).json({ message: 'Logout' });

      } catch (error) {
        const errorObject = error as IError;

        next({
          message: errorObject.message,
          status: errorObject.status || 401,
        });
      }
    })
};
