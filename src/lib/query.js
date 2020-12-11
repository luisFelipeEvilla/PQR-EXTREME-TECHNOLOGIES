const pool = require('../database');

async function query(q) {
    let res;

    try {
        res = await pool.query(q);
    } catch (err) {
        console.log(err.stack);
    }

    return res;
   
}

module.exports = query;