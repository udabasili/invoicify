import { ProjectAttributes, ProjectCreationAttributes } from "@/interfaces/IProject"
import { Model, Sequelize, DataTypes, ModelDefined } from "sequelize"


export default ({
    sequelize
    }: {
        sequelize: Sequelize
    }) => {

        const project: ModelDefined<ProjectAttributes, ProjectCreationAttributes> = sequelize.define('Projects', {
            projectId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                unique:true,
                primaryKey: true,
            },
            projectName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            summary: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            dueDate: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            status: {
                type: DataTypes.STRING,
                validate: {
                    isIn: [[
                        'ongoing',
                        'completed'
                    ]]
                },
                defaultValue: 'ongoing'

            },
        })

        return project
}