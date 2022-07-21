import { UserAttributes } from "@/interfaces/IUser"
import { Request } from "express"

declare global {
    namespace Express {
      export interface Request {
        currentUser: UserAttributes
        userId: string
      }    
    }
}