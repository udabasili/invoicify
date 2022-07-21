import { ProductAttributes, ProductCreationAttributes, IProductInputDTO } from "@/interfaces/IProduct"
import Logger from "@/loaders/logger";
import db from "@/models"
import { Model } from "sequelize/types"

class ProductService {

    constructor(public currentUserId: string) {
        this.currentUserId = currentUserId
    }

    public async create(data: IProductInputDTO) {
        Logger.silly('Creating product db record');

        await db.product.create({
            ...data,
            creatorId: this.currentUserId
            
        })
        const currentUserProducts = await this.getCurrentUserProducts(this.currentUserId)
        return currentUserProducts
    }

    public async getCurrentUserProducts(creatorId: string): Promise<Model<ProductAttributes, ProductCreationAttributes>[]> {
        Logger.silly('Getting current user product db record');

        const record = await db.product.findAll({
            where: {
                creatorId
            }
        })

        return record
    }
}

export default ProductService