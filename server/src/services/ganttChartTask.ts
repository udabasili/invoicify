import { GanttChartTaskAttributes, GanttChartTaskCreationAttributes, IGanttChartTaskDTO } from "@/interfaces/GanttChartTask"
import Logger from "@/loaders/logger";
import db from "@/models"
import { Model } from "sequelize/types"

class GanttChartTaskService {

    constructor(public projectId: string) {
        this.projectId = projectId
    }

    public async create(data: IGanttChartTaskDTO[]) {
        Logger.silly('Creating gantt chart task db record');
        await db.ganttChartTask.bulkCreate([
            ...data,  
        ])
    }

    public async updateParentTask(parentId: number) {
        Logger.silly('Updating parent gantt chart task db record');
        const children = await db.ganttChartTask.findAll({
            where: {
                parentId
            }
        })

        let total = children.length
        let completed = children.filter(task => task.toJSON().completed).length
        await db.ganttChartTask.update({
            progress: (completed / total) * 100
        }, {
            where: {
                id: parentId
            }
        })
    }

    public async update(data: GanttChartTaskAttributes, ganttTaskId: string) {
        Logger.silly('Updating gantt chart task db record');
        await db.ganttChartTask.update({
            ...data,
            progress: data.completed ? 0 : 100
        }, {
            where: {
                ganttTaskId
            }
        })
        await this.updateParentTask(data.parentId)
    }

    public async delete(ganttTaskId: string) {
        Logger.silly('Deleting gantt chart task db record');

        await db.ganttChartTask.destroy({
            where: {
                ganttTaskId
            }
        })
    }


    public async getProjectGanttCharts(): Promise<Model<GanttChartTaskAttributes, GanttChartTaskCreationAttributes>[]> {
        Logger.silly('Getting gantt chart task for current project');
        const record = await db.ganttChartTask.findAll({
            where: {
                projectId: this.projectId   
            },
            include: {
                model: db.project,
                attributes: [
                    'projectId',
                    'projectName'
                ]

            },
            order: [
                ['id', 'ASC'],
            ]

        })
        return record
    }
}

export default GanttChartTaskService