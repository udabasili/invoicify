import { DataTypes, Optional } from "sequelize";

export type InvoiceItems = {
    productName: string
    description?: string
    unitPrice: number
    quantity: number
    
}

export type InvoiceAttributes = {
    invoiceId: string
    clientId: string
    title: string
    dueDate: Date
    serviceProviderId: string
    note: string
    paymentStatus?: 'paid' | 'pending'
    items?: Array<InvoiceItems>
}

export  type InvoiceCreationAttributes = Optional<InvoiceAttributes, 'invoiceId'>;


export interface Invoice extends InvoiceAttributes {
    createdAt: Date
    updatedAt: Date
    serviceProviderId: string
}

export interface InvoiceInputDTO {
    clientId: string
    title: string
    dueDate: Date
    serviceProviderId: string
    note: string
    paymentStatus?: 'paid' | 'pending'
    items?: Array<InvoiceItems>

}