import { Idb } from "@/interfaces/IDatabase"
import user from "./user"
import sequelize from "../loaders/db";
import Sequelize from "sequelize";
import client from "./client";
import ganttChartTask from "./ganttChartTask";
import invoices from "./invoices";
import orders from "./orders";
import project from "./project";
import product from "./product";
import token from "./token";

const db  = {} as Idb

db.sequelize = sequelize
db.Sequelize = Sequelize
db.user = user({sequelize})
db.client = client({sequelize})
db.ganttChartTask = ganttChartTask({sequelize})
db.invoice = invoices({sequelize})
db.order = orders({sequelize})
db.project = project({sequelize})
db.token = token({sequelize})
db.product = product({sequelize})




export default db