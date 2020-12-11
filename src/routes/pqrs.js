const express = require('express');
const { route } = require('.');

const router = express.Router();

const pool = require('../database');

router.get('/', async (req, res) => {
    const q = {
        text: 'SELECT username, pqrs.id, tipo, asunto, estado, created_at, expired_at FROM pqrs INNER JOIN users ON pqrs.user_id = users.id ORDER BY created_at DESC'
    }

    const pqrs = await query(q)
    res.render('pqrs/list', {pqrs});
})

router.get('/add', (req, res) => {
    res.render('pqrs/add');
})

router.get('/:id', async (req, res) => {
    const q = {
        text: 'SELECT username, pqrs.id, tipo, asunto, estado, created_at, expired_at FROM pqrs INNER JOIN users ON pqrs.user_id = users.id WHERE pqrs.id = $1',
        values: [req.params.id]
    }

    const pqr = await query(q);
    res.render('pqrs/pqr', {pqr});
})

router.post('/add', (req, res) => {
    const { tipo, asunto } = req.body;

    // temporal 
    const user = {
        id: 1
    };

    const newPQR = {
        user_id: user.id,
        tipo,
        asunto,
        expired_at: '2020-12-17'
    };

    const q = {
         text: 'INSERT INTO pqrs(user_id, tipo, asunto, expired_at) VALUES($1, $2, $3, $4) RETURNING *',
        values: [newPQR.user_id, newPQR.tipo, newPQR.asunto, newPQR.expired_at]
    
    }
    
    query(q);
    req.flash('success', 'El PQR se ha generado satisfactoriamente');
    res.redirect('/pqrs');
})

router.get('/delete/:id', async (req, res) => {
    const {id} = req.params;

    const q = {
        text: 'DELETE FROM pqrs WHERE id = $1',
        values: [id]
    }
  
    await query(q);
    req.flash('success', 'PQR removido satisfactoriamente');
    res.redirect('/pqrs');
})

router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;

    const q = {
        text: 'SELECT * FROM pqrs where id = $1',
        values: [id]
    }

    const pqr = await query(q);

    res.render('pqrs/edit', {pqr : pqr[0]});
})

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { 
        asunto,
        estado,
    } = req.body;

    const q = {
        text: 'UPDATE pqrs SET asunto = $1, estado = $2 WHERE id = $3',
        values: [asunto, estado, id]
    }
    
    await query(q);
    req.flash('sucess', 'PQR actualizado satisfactoriamente');
    res.redirect('/pqrs');
})

async function query(q) {
    let res;

    try {
        res = await pool.query(q);
        console.log(res.rows[0]);
    } catch (err) {
        console.log(err.stack);
    }

    return res.rows;
   
}

module.exports = router;