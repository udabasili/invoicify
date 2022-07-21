import { ProductAttributes, ProductCreationAttributes } from "@/interfaces/IProduct"
import { Model, Sequelize, DataTypes, ModelDefined } from "sequelize"


export default ({
    sequelize
    }: {
        sequelize: Sequelize
    }) => {

        const product: ModelDefined<ProductAttributes, ProductCreationAttributes> = sequelize.define('Products', {
            productId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                unique:true,
                primaryKey: true,
            },
            features: {
                type: DataTypes.TEXT,
                allowNull: false,

            },
            title: {
                type: DataTypes.TEXT,
                allowNull: false,
                unique:true
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique:true
            },
        }
        )

        return product
}