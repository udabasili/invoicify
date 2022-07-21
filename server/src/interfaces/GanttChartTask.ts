import { DataTypes, Optional } from "sequelize";

export type GanttChartTaskAttributes = {
    id: number
    parentId: number
    start: Date
    end?: Date
    duration?: number
    title: string
    progress?: number
    completed?: boolean
    projectId: string
    ganttTaskId: string
    successorId?: number

}

export  type GanttChartTaskCreationAttributes = Optional<GanttChartTaskAttributes, 'ganttTaskId'>;


export interface GanttChartTask extends  GanttChartTaskAttributes {
    createdAt: Date
    updatedAt: Date
    projectId: string
}

export interface IGanttChartTaskDTO {
    id: number
    parentId: number
    start: Date
    end?: Date
    duration?: number
    title: string
    progress?: number
    completed?: boolean
    projectId: string
    successorId?: number
}