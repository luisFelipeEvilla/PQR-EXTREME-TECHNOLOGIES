require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 3000,
    database: {
        user: process.env.DB_USER || 'pqrs',
        host: process.env.DB_HOST || 'localhost',
        database: process.env.DB_NAME || 'pqrs',
        password: process.env.DB_PASSWORD || 'password',
        port: process.env.DB_PORT || 5432,
        ssl: true,
        extra: {
            ssl: {
                rejectUnauthorized: false
            },
        },
    },
    SECRET: process.env.SECRET || 'secret'
}