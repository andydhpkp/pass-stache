const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Credential } = require('../models');

// get all of users credentials for dashboard
router.get('/:id', (req, res) => {
    console.log('=========================')
    Credential.findAll({
        where: {
            // change this to req.session.user_id when login is functioning
            user_id: req.params.id
        }
    })
        .then(dbCredentialData => {
            const credentials = dbCredentialData.map(cred => cred.get({plain: true}));

            res.render('homepage', {
                credentials
                // include this:
                // loggedIn: req.session.loggedIn
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
})

module.exports = router
