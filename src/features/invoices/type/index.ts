import { Client } from "@/features/clients/types"
import { UserAttributes } from "@/features/user/types"

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
  dueDate: Date | string
  serviceProviderId: string
  note: string
  paymentStatus?: 'paid' | 'pending'
  items?: Array<InvoiceItems>
}


export interface Invoice extends InvoiceAttributes {
  createdAt: Date
  updatedAt: Date
  serviceProviderId: string
  client: Client
  serviceProvider: UserAttributes
}

export interface InvoiceDTO {
  clientId: string
  title: string
  dueDate: Date
  note: string
  paymentStatus?: 'paid' | 'pending'
  items: Array<InvoiceItems>

}