import { DataTypes, Optional } from "sequelize";

export type OrderAttributes = {
    orderId: string
}

export  type OrderCreationAttributes = Optional<OrderAttributes, 'orderId'>;


export interface Order extends OrderAttributes {
    createdAt: Date
    updatedAt: Date
    creatorId: string
}