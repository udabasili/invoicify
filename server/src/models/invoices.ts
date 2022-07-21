import { InvoiceAttributes, InvoiceCreationAttributes } from "@/interfaces/Invoice"
import { Model, Sequelize, DataTypes, ModelDefined } from "sequelize"


export default ({
    sequelize
    }: {
        sequelize: Sequelize
    }) => {

        const Invoice: ModelDefined<InvoiceAttributes, InvoiceCreationAttributes> = sequelize.define('Invoices', {
            invoiceId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                unique:true,
                primaryKey: true,
            },
            title: {
                type: DataTypes.TEXT,
                allowNull: false,
                unique:true,
            },
            note: {
                type: DataTypes.TEXT,
            },
            dueDate: {
                type: DataTypes.DATE,
                allowNull: false,
                unique:true,
            },
            paymentStatus: {
                type: DataTypes.STRING,
                validate: {
                    isIn: [[
                        'paid',
                        'pending'
                    ]]
                },
                defaultValue: 'pending'
            },
            items: {
                type: DataTypes.ARRAY(DataTypes.JSON),
            }}
        )

        return Invoice
}