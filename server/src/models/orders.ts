import { OrderAttributes, OrderCreationAttributes } from "@/interfaces/IOrder"
import { Model, Sequelize, DataTypes, ModelDefined } from "sequelize"


export default ({
    sequelize
    }: {
        sequelize: Sequelize
    }) => {

        const Order: ModelDefined<OrderAttributes, OrderCreationAttributes> = sequelize.define('Orders', {
            invoiceId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                unique:true,
                primaryKey: true,
            },
            items: {
                type: DataTypes.ARRAY(DataTypes.JSON),
            }}
        )

        return Order
}