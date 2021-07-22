require('dotenv').config();

module.exports = {
    PORT : process.env.PORT,
    dbName : process.env.DB_NAME,
    dbUser : process.env.DB_USER,
    dbPass : process.env.DB_PASSWORD,
    dbHost : process.env.DB_HOST,
    dbPort : process.env.DB_PORT
}