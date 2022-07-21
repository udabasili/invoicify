import { InvoiceAttributes, InvoiceCreationAttributes, InvoiceInputDTO } from "@/interfaces/Invoice"
import Logger from "@/loaders/logger";
import db from "@/models"
import { Model } from "sequelize/types"

class InvoiceService {

    constructor(public currentUserId: string) {
        this.currentUserId = currentUserId
    }

    public async updateInvoice(updatedClientData: InvoiceAttributes, invoiceId: string) {
        Logger.silly('Updating invoice db record');

        await db.invoice.update(updatedClientData,{
            where: {
                invoiceId
            }
        })
    }

    public async delete(invoiceId: string ) {
        Logger.silly('Deleting invoice db record');

        await db.invoice.destroy({
            where: {
                invoiceId
            }
        })
    }

    public async create(data: InvoiceInputDTO) {
        Logger.silly('Creating invoice db record');

        await db.invoice.create({
            ...data,
            serviceProviderId: this.currentUserId
            
        })
        const currentUserInvoices = await this.getCurrentUserInvoices(this.currentUserId)
        return currentUserInvoices
    }

    public async getCurrentUserInvoices(serviceProviderId: string): Promise<Model<InvoiceAttributes, InvoiceCreationAttributes>[]> {
        Logger.silly('Getting invoice db record for current user');

        const record = await db.invoice.findAll({
            where: {
                serviceProviderId
            },
            include: {
                model: db.client,
                as: 'client',  
                attributes: [
                    'userId',
                    'name'
                ]

            },

        })
        return record
    }

    public async getInvoiceById(invoiceId: string): Promise<Model<InvoiceAttributes, InvoiceCreationAttributes>> {
        
        const record = await db.invoice.findOne({
            where: {
                invoiceId
            },
            include: [
            {
                model: db.client,
                as: 'client' 
            }, 
            {
                model: db.user,
                as: 'serviceProvider'
            },
            {
                model: db.project,
                as: 'project'
            },

        ]
           
        })
        return record as Model<InvoiceAttributes, InvoiceCreationAttributes>
    }
}

export default InvoiceService