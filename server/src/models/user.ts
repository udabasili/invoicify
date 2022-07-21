import { UserAttributes, UserCreationAttributes } from "@/interfaces/IUser"
import { Model, Sequelize, DataTypes, ModelDefined } from "sequelize"


export default ({
    sequelize
    }: {
        sequelize: Sequelize
    }) => {

        const users: ModelDefined<UserAttributes, UserCreationAttributes> = sequelize.define('Users', {
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
            companyName: {
                type: DataTypes.STRING,
                allowNull: false,

            },
            address: {
                type: DataTypes.TEXT,
                allowNull: false,

            },
            logo: {
                type: DataTypes.STRING,
            },
            city: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            country: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            hashedPassword: {
                type: DataTypes.TEXT,
            }
        })

        return users
}