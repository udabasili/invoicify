import { IProjectInputDTO, ProjectAttributes, ProjectCreationAttributes , ProjectInputDTO} from "@/interfaces/IProject"
import Logger from "@/loaders/logger";
import db from "@/models"
import { Model } from "sequelize/types"

class ProjectService {

    constructor(public currentUserId: string) {
        this.currentUserId = currentUserId
    }

    public async create(data: ProjectInputDTO) {
        Logger.silly('Creating project db record');

        await db.project.create({
            ...data,
            serviceProviderId: this.currentUserId
            
        })
        const currentUserProjects = await this.getCurrentUserProjects(this.currentUserId)
        return currentUserProjects
    }

    public async deleteProject(projectId: string) {
        Logger.silly('Deleting project db record');
        await db.project.destroy({
            where: {
                projectId
            }
        })
    }

    public async updateProjectProject(projectId: string, updatedProjectData: any ) {
        Logger.silly('Updating project db record');

        await db.project.update(updatedProjectData,{
            where: {
                projectId
            }
        })
    }

    public async getCurrentUserProjects(serviceProviderId: string): Promise<Model<ProjectAttributes, ProjectCreationAttributes>[]> {
        Logger.silly('Getting current user project db record');

        const record = await db.project.findAll({
            where: {
                serviceProviderId
            }
        })

        return record
    }
}

export default ProjectService