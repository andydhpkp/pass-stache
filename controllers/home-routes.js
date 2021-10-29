const router = require('express').Router();
const { route } = require('.');
const sequelize = require('../config/connection');
const { User, Credential } = require('../models');

// render homepage
router.get('/', (req, res) => {
    res.render('homepage');
})

module.exports = router;