const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Credential } = require('../models');

// get all of users credentials for dashboard
router.get('/', (req, res) => {
    console.log('=========================')
    Credential.findAll({
        where: {
            user_id: req.session.user_id
        },
        order: [['nickname', 'ASC']]
    })
        .then(dbCredentialData => {
            const credentials = dbCredentialData.map(cred => cred.get({plain: true}));

            res.render('dashboard', {
                credentials,
                loggedIn: req.session.loggedIn
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
})

module.exports = router