import { GanttChartTaskAttributes, GanttChartTaskCreationAttributes } from "@/interfaces/GanttChartTask"
import { Model, Sequelize, DataTypes, ModelDefined } from "sequelize"


export default ({
    sequelize
    }: {
        sequelize: Sequelize
    }) => {

        const ganttChartTask: ModelDefined<GanttChartTaskAttributes, GanttChartTaskCreationAttributes> = sequelize.define('GanttChartTasks', {
            ganttTaskId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                unique:true,
                primaryKey: true,
            },
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            parentId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
                unique:true
            },
            start: {
                type: DataTypes.DATE,
                validate: {
                    isDate: true
                }
            },
            end: {
                type: DataTypes.DATE,
                validate: {
                    isDate: true
                }
            },
            progress: {
                type: DataTypes.INTEGER,
            },
            successorId: {
                type: DataTypes.INTEGER,
            },
            completed: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        }
        )

        return ganttChartTask
}