import { TokenAttributes, TokenCreationAttributes } from "@/interfaces/IToken"
import { Sequelize, DataTypes, ModelDefined } from "sequelize"

export default ({
    sequelize
    }: {
        sequelize: Sequelize
    }) => {

        const Invoice: ModelDefined<TokenAttributes, TokenCreationAttributes> = sequelize.define('Token', {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                unique:true,
                primaryKey: true,
            },
            refreshToken: {
                type: DataTypes.TEXT
            }}
        )

        return Invoice
}