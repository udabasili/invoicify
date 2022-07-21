const { Sequelize } = require("sequelize");
import url from 'url';
import config from "@/config";

let databaseHost: string = "";
let databaseName: string = "";
let sequelize: any = "";

if (process.env.NODE_ENV === "development") {
  databaseHost = config.dev.host || "";
  databaseName = config.dev.dbName || "";
  sequelize = new Sequelize(databaseName, config.user, config.password, {
    host: databaseHost,
    dialect: "postgres",
    logging: false,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle,
    },
  });
} else {
    const { DATABASE_URL } = process.env;
    const dbUrl = url.parse(DATABASE_URL as string);
    const username = dbUrl.auth?.substr(0, dbUrl.auth.indexOf(':'));
    const password = dbUrl.auth?.substr(
      dbUrl.auth.indexOf(':') + 1,
      dbUrl.auth.length
    );
    const dbName = dbUrl.path?.slice(1);
    const host = dbUrl.hostname;
    const { port } = dbUrl;
    config.production.host = host as any;
    config.production.port = port as string;
    sequelize = new Sequelize(dbName, username, password, config.production);
}


export default sequelize;
