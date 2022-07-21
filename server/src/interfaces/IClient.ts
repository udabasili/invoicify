import { DataTypes, Optional } from "sequelize";

export type ClientAttributes = {
  userId: string;
  name: string;
  email: string;
  city?: string;
  country?: string;
  address?: string;
  serviceProviderId?: string
};

export type ClientCreationAttributes = Optional<ClientAttributes, "userId">;

export interface IClientInputDTO {
  name: string;
  email: string;
  city?: string;
  country?: string;
  address?: string;
}

export interface Client extends ClientAttributes{
 
};
