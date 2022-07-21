import { ClientAttributes, ClientCreationAttributes } from "@/interfaces/IClient"
import { Model, Sequelize, DataTypes, ModelDefined } from "sequelize"


export default ({
    sequelize
    }: {
        sequelize: Sequelize
    }) => {

        const client: ModelDefined<ClientAttributes, ClientCreationAttributes> = sequelize.define('Clients', {
            userId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                unique:true,
                primaryKey: true,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique:true,
                validate: {
                    isEmail: true
                }
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            city: {
                type: DataTypes.STRING,
            },
            country: {
                type: DataTypes.STRING
            },
            address: {
                type: DataTypes.STRING
            },
        })

        return client
}