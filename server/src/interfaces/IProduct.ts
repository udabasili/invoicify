import { DataTypes, Optional } from "sequelize";

export type ProductAttributes = {
    productId: string
    features: string
    title: string
    price: string
    creatorId: string

}

export  type ProductCreationAttributes = Optional<ProductAttributes, 'productId'>;

export interface IProductInputDTO {
    features: string
    title: string
    price: string
}
  

export interface Product extends ProductAttributes {
    createdAt: Date
    updatedAt: Date
    creatorId: string
}