const express = require('express');

const query = require('../lib/query');

const router = express.Router();

router.get('/', async (req, res, next) => {
    const q = {
        text: 'SELECT * FROM users'
    }

    const result = await query(q)

    res.render('users/list', {users: result.rows});
})

module.exports = router;