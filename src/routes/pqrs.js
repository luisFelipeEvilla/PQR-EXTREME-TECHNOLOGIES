const express = require('express');
const { route } = require('.');

const router = express.Router();

const pool = require('../database');

router.get('/add', (req, res) => {
    res.render('pqrs/add');
})

router.post('/add', (req, res) => {
    res.send('recibido');
})

module.exports = router;