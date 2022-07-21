import { DataTypes, Optional } from "sequelize";

export type ProjectAttributes = {
    projectId: string
    projectName: string
    summary: string,
    status?: 'ongoing' | 'completed'
    dueDate?: Date
    serviceProviderId: string


}

export  type ProjectCreationAttributes = Optional<ProjectAttributes, 'projectId'>;

export type ProjectInputDTO = {
    projectName: string
    summary: string,
    status?: 'ongoing' | 'completed'
    dueDate?: Date,
    clientId: string
    serviceProviderId: string
}

export interface Project extends ProjectAttributes {
    createdAt: Date
    updatedAt: Date
    invoiceId: string
    clientId: string
}

export interface IProjectInputDTO {
    name: string;
    email: string;
    password: string;
    username: string
}