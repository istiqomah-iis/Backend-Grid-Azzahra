const database = require('pg-promise')();
require('dotenv').config();

const db = database({
    host        : process.env.HOST,
    port        : process.env.DB_PORT,
    database    : process.env.DB_NAME,
    username    : process.env.DB_USERNAME,
    password    : process.env.DB_PASSWORD
});

module.exports = db;