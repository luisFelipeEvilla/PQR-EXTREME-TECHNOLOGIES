const express = require('express');
const router = express.Router();

const passport = require('passport');

router.get('/signup', (req, res) => {
    res.render('auth/signup');
})

router.post('/signup', passport.authenticate('local', {
        successRedirect: '/profile',
        failureRedirect: '/pqrs',
        failureFlash: true
    }))

router.get('/profile', (req, res) => {
    res.send('perfil')
})
module.exports = router;