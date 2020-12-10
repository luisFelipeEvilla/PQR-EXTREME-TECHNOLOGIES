const { Pool } = require('pg');
const chalk = require('chalk');
const {database: config } = require('./config');

const pool = new Pool(config);
pool.connect()
    .then((client, release) => {
        if (client) {
            console.log(chalk.green("Conexión establecida satisfactoriamente con la base de datos"));
        }
    })
    .catch(err => {
        console.error(error);
    });
    
pool.query('SELECT NOW()')
    .then(response => {
        console.log(response.rows);
        pool.end();
    })
    .catch(err => {
        console.error(err)
        pool.end()
    })

module.exports = pool;