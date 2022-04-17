
export interface GanttChartTaskDTO {
    id: number
    parentId: number
    start: Date
    end?: Date
    duration?: number
    title: string
    progress?: number
    completed?: boolean
    successorId?: number
}


export interface GanttChartTask extends  GanttChartTaskDTO {
    createdAt: Date
    updatedAt: Date
    projectId: number
    ganttTaskId: string
}
