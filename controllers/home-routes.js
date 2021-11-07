const router = require('express').Router();
const { route } = require('.');
const sequelize = require('../config/connection');
const { User, Credential } = require('../models');

// render homepage
router.get('/', (req, res) => {
    res.render('homepage', {
        loggedIn: req.session.loggedIn
    });
})

// render login page
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
    }

    res.render('login');
})

// render registration page
router.get('/register', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
    }

    res.render('register');
})

// render verify page
router.get('/verify', (req, res) => {
    res.render('verify')
})

module.exports = router;