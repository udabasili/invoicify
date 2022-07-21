import { Optional } from "sequelize";

export type UserAttributes = {
    userId: string,
    name: string,
    companyName: string,
    email: string,
    hashedPassword: string,
    address: string,
    city: string
    country: string
    logo?: string
}

export  type UserCreationAttributes = Optional<UserAttributes, 'userId'>;
 
export interface IUserInputDTO {
    name: string,
    companyName: string,
    email: string,
    password: string,
    address: string,
    city: string
    country: string
    logo?: string
}

export interface LoginDTO {
    email: string
    password: string
}