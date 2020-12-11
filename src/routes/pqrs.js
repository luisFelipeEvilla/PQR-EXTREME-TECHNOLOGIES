const express = require('express');
const query = require('../lib/query');

const router = express.Router();
const { isLoggedIn } = require('../lib/auth');

router.get('/', isLoggedIn, async (req, res) => {
    const q = {};
    console.log(req.user);
    if (req.user.admin) {
        q.text = 'SELECT email, pqrs.id, tipo, asunto, estado, created_at, expired_at FROM pqrs INNER JOIN users ON pqrs.user_id = users.id ORDER BY created_at DESC'
    } else {
        q.text = 'SELECT email, pqrs.id, tipo, asunto, estado, created_at, expired_at FROM pqrs INNER JOIN users ON pqrs.user_id = users.id WHERE users.id = $1 ORDER BY created_at DESC';
        q.values = [req.user.id];     
    }
    const result = await query(q)
    const pqrs = result.rows;

    res.render('pqrs/list', {pqrs});
})

router.get('/add', isLoggedIn, (req, res) => {
    res.render('pqrs/add');
})

router.get('/:id', isLoggedIn, async (req, res) => {
    const q = {
        text: 'SELECT email, pqrs.id, tipo, asunto, estado, created_at, expired_at FROM pqrs INNER JOIN users ON pqrs.user_id = users.id WHERE pqrs.id = $1',
        values: [req.params.id]
    }

    const result = await query(q);
    const pqr = result.rows[0];
    const { user } = req;

    res.render('pqrs/pqr', {pqr, user});
})

router.post('/add', isLoggedIn, async (req, res) => {
    const { tipo, asunto } = req.body;

    const { user } = req;

    const newPQR = {
        user_id: user.id,
        tipo,
        asunto,
        expired_at: new Date()
    };
    const result = await query('SELECT NOW()')
    const date = result.rows[0];
    const t = new Date(date.now);

    if (tipo.localeCompare('Petición') == 0) {
        console.log('peticion');
        newPQR.expired_at = new Date(t.getFullYear(), t.getMonth(), t.getDate() + 7, t.getHours(), t.getMinutes());     
    } else {
        if (tipo.localeCompare('Queja') == 0) {
            newPQR.expired_at = new Date(t.getFullYear(), t.getMonth(), t.getDate() + 3, t.getHours(), t.getMinutes());
        } else {
            newPQR.expired_at = new Date(t.getFullYear(), t.getMonth(), t.getDate() + 2, t.getHours(), t.getMinutes());
        }
    }

    const q = {
         text: 'INSERT INTO pqrs(user_id, tipo, asunto, expired_at) VALUES($1, $2, $3, $4) RETURNING *',
        values: [newPQR.user_id, newPQR.tipo, newPQR.asunto, newPQR.expired_at]
    
    }
    
    query(q);
    req.flash('success', 'El PQR se ha generado satisfactoriamente');
    res.redirect('/pqrs');
})

router.get('/delete/:id', isLoggedIn, async (req, res) => {
    const {id} = req.params;

    const q = {
        text: 'DELETE FROM pqrs WHERE id = $1',
        values: [id]
    }
  
    await query(q);
    req.flash('success', 'PQR removido satisfactoriamente');
    res.redirect('/pqrs');
})

router.get('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;

    const q = {
        text: 'SELECT * FROM pqrs where id = $1',
        values: [id]
    }

    const pqr = await query(q);

    res.render('pqrs/edit', {pqr : pqr.rows[0]});
})

router.post('/edit/:id', isLoggedIn, async (req, res) => {
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

module.exports = router;