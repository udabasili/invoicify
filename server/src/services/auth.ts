import { IError } from "@/interfaces/IError";
import {
  IUserInputDTO,
  LoginDTO,
  UserAttributes,
  UserCreationAttributes,
} from "@/interfaces/IUser";
import Logger from "@/loaders/logger";
import { generateToken, reIssueAccessToken } from "@/loaders/token";
import db from "@/models";
import argon2 from "argon2";

type TokenResponse = {
  accessToken: string;
  refreshToken: string;
};
class AuthService {
    public async signUp(
        userInputDTO: IUserInputDTO
    ): Promise<{ user: UserAttributes; token: TokenResponse }> {
        try {
          Logger.silly("Hashing password");

        const hash = await argon2.hash(userInputDTO.password);
        Reflect.deleteProperty(userInputDTO, "password");
        Logger.silly('Creating user db record');
        const userRecord = await db.user.create({
            ...userInputDTO,
            hashedPassword: hash,
        });
        let user = userRecord.toJSON();
        const token = await generateToken(user.userId);
        Logger.silly("Creating token");

        await db.token.create({
            userId: user.userId,
            refreshToken: token.refreshToken,
        });
        Reflect.deleteProperty(user, "hashedPassword");
        Reflect.deleteProperty(user, "email");

        return {
            user,
            token,
        };
    } catch (e) {
        const errorObject: IError = e as IError
        Logger.error(errorObject.message);
        throw e;
    }
  }

  public async login(
    loginInput: LoginDTO
  ): Promise<{ user: UserAttributes; token: TokenResponse }> {

    try {
      Logger.silly('Finding user record');

        const userRecord = await db.user.findOne({
            where: {
              email: loginInput.email,
            },
          });
      
          if (userRecord === null) {
            throw new Error("User not registered");
          }
          
          const verifiedPassword = await argon2.verify(
            userRecord.toJSON().hashedPassword.trim(),
            loginInput.password.toString()
          );
          if (!verifiedPassword) {
            throw new Error("Email / Password don't match");
          }
      
          let user = userRecord.toJSON();
          Logger.silly('Generating Token');

          const token = await generateToken(user.userId);
          await db.token.create({
            userId: user.userId,
            refreshToken: token.refreshToken,
          });
          Reflect.deleteProperty(user, "hashedPassword");
          Reflect.deleteProperty(user, "email");
      
          return {
            user,
            token,
          }

    }  catch (e) {
        const errorObject: IError = e as IError
        Logger.error(errorObject.message);
        throw e;
    }
   
  }

  public static async reIssueToken (refreshToken: string) {
    try {

    //check if access token even exists. If must exist or user has to login again
        if (!refreshToken) {
            throw new Error('Unauthorized')
        }
        const accessToken = await reIssueAccessToken(refreshToken)
        return accessToken
        
    } catch (e) {
      const errorObject: IError = e as IError
      Logger.error(errorObject.message);
      throw e;
    }
  }
}

export default AuthService;
