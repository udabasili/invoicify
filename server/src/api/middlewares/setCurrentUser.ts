import { IError } from "@/interfaces/IError";
import Logger from "@/loaders/logger";
import db from "@/models";
import { Request, Response, NextFunction } from "express";

const setCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userRecord = await db.user.findOne({
      where: {
        userId: req.params.userId
      }
    });
    if (!userRecord) {
      throw new Error('UnAuthorized')
    }
    const currentUser = userRecord.toJSON()
    Reflect.deleteProperty(currentUser, 'hashedPassword');
    Reflect.deleteProperty(currentUser, 'email');
    Logger.debug('Setting current user')

    req.currentUser = currentUser;
    return next();
  } catch (e) {
    const errorObject = e as IError
    Logger.error('🔥 Error attaching user to req: %o', errorObject.message);
    return next({
      message: 'UnAuthorized',
      status: 401
    })
  }

}

export default setCurrentUser