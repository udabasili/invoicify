import dotenv from 'dotenv'
dotenv.config()

export default {
    port: process.env.PORT || 5000,
    test: {
        host: process.env.POSTGRES_DATABASE_HOST_DEV,
        dbName: process.env.POSTGRES_DATABASE_NAME_DEV
    },
    dev: {
        host: process.env.POSTGRES_DATABASE_HOST_DEV,
        dbName: process.env.POSTGRES_DATABASE_NAME_DEV
    },
    production: {
        use_env_variable: 'DATABASE_URL',
        host: '',
        port: '',
        dialect: 'postgres',
        protocol: 'postgres',
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
    },
    jwtSecret: process.env.JWT_SECRET_KEY,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASS,
    secretKey: process.env.SECRET_KEY  as string,
    refreshSecretKey: process.env.REFRESH_SECRET_KEY as string,
    pool: {
        max: 5, //maximum number of connection in pool
        min: 0,
        acquire: 30000, // maximum time, in milliseconds, that a connection can be idle before being released
        idle: 10000 //maximum time, in milliseconds, that pool will try to get connection before throwing error
    }
}