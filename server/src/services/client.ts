import { ClientAttributes, ClientCreationAttributes, IClientInputDTO } from "@/interfaces/IClient"
import Logger from "@/loaders/logger";
import db from "@/models"
import { Model } from "sequelize/types"

class ClientService {

    constructor(public currentUserId: string) {
        this.currentUserId = currentUserId
    }

    public async create(data: IClientInputDTO) {
        Logger.silly('Creating client db record');

        await db.client.create({
            ...data,
            serviceProviderId: this.currentUserId
            
        })
        const currentUserClients = await this.getCurrentUserClients(this.currentUserId)
        return currentUserClients
    }

    public async updateClient(updatedClientData: ClientAttributes, userId: string) {
        Logger.silly('Updating client db record');

        await db.client.update(updatedClientData,{
            where: {
                userId
            }
        })
    }

    public async delete(userId: string ) {
        Logger.silly('Deleting client db record');

        await db.client.destroy({
            where: {
                userId
            }
        })
    }

    public async getCurrentUserClients(serviceProviderId: string): Promise<Model<ClientAttributes, ClientCreationAttributes>[]> {
        Logger.silly('Getting current user clients db record');

        const record = await db.client.findAll({
            where: {
                serviceProviderId
            }
        })

        return record
    }
}

export default ClientService