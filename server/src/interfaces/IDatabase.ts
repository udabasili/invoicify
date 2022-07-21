import { ModelDefined, Sequelize } from "sequelize/types";
import { ClientAttributes, ClientCreationAttributes } from "./IClient";
import { GanttChartTaskAttributes, GanttChartTaskCreationAttributes } from "./GanttChartTask";
import { InvoiceAttributes, InvoiceCreationAttributes } from "./Invoice";
import { OrderAttributes, OrderCreationAttributes } from "./IOrder";
import { ProductAttributes, ProductCreationAttributes } from "./IProduct";
import { ProjectAttributes, ProjectCreationAttributes } from "./IProject";
import { UserAttributes, UserCreationAttributes } from "./IUser";
import { TokenAttributes, TokenCreationAttributes } from "./IToken";

export interface Idb {
    user: ModelDefined<UserAttributes, UserCreationAttributes>,
    client: ModelDefined<ClientAttributes, ClientCreationAttributes>,
    ganttChartTask: ModelDefined<GanttChartTaskAttributes, GanttChartTaskCreationAttributes>,
    order: ModelDefined<OrderAttributes, OrderCreationAttributes>,
    project: ModelDefined<ProjectAttributes, ProjectCreationAttributes>,
    invoice: ModelDefined<InvoiceAttributes, InvoiceCreationAttributes>,
    product: ModelDefined<ProductAttributes, ProductCreationAttributes>,
    token: ModelDefined<TokenAttributes, TokenCreationAttributes>,
    Sequelize: any,
    sequelize: Sequelize
}