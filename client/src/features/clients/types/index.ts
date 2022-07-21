export interface ClientDTO {
  userId?: string
    name: string;
    email: string;
    city?: string;
    country?: string;
    address?: string;
}


export interface Client extends ClientDTO {
  userId: string
  createdAt: Date
  updatedAt: Date
  serviceProviderId: string
}