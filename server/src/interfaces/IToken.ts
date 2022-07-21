import { Optional } from "sequelize";

export type TokenAttributes = {
    id: string
    userId: string
    refreshToken: string
}

export  type TokenCreationAttributes = Optional<TokenAttributes, 'id'>;
