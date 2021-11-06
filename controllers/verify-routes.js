const router = require('express').Router();
const { route } = require('.');
const sequelize = require('../config/connection');

// render verify
router.get('/verify', (req, res) => {
    res.render('/verify')
})

module.exports = router;