const router = require('express').Router();
const { route } = require('.');
const sequelize = require('../config/connection');
const { User, Credential } = require('../models');

// render homepage
router.get('/', (req, res) => {
    res.render('homepage');
})

// render login page
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
    }

    res.render('login');
})

// render login page
router.get('/register', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
    }

    res.render('register');
})

module.exports = router;