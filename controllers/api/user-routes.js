const router = require('express').Router()
const { User, Credential } = require('../../models')
const twoFactor = require("node-2fa");

router.get('/', (req, res) => {
    User.findAll({

    })
    .then(dbUser => res.json(dbUser))
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

router.get('/:id', (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Credential,
                attributes: ['id', 'nickname', 'login_name', 'password', 'user_id']
            }
        ]
    })
    .then(dbUser => {
        if(!dbUser) {
            res.status(404).json({ message: 'No user found with this id' })
            return
        }
        res.json(dbUser)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

//create new
router.post('/', (req, res) => {
    User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        email: req.body.email,
        master_password: req.body.master_password,
        temp_secret: twoFactor.generateSecret().secret
    })
    .then(dbUser => {
        req.session.save(() => {
            req.session.user_id = dbUser.id;
            req.session.loggedIn = true;

            res.json(dbUser)
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

//verify token
router.post('/verify/:id', (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(verifyUser => {
        console.log('verifyUser.temp_secret = ' + verifyUser.temp_secret)
        let secret = verifyUser.temp_secret
        let token = twoFactor.generateToken(secret).token
        console.log('token = ' + token)
        let verified = twoFactor.verifyToken(secret, token)

        console.log('verified = ' + verified.delta)

        switch(verified.delta) {
            case 0:
                res.json({ message: 'verified' })
                break;
            case -1:
                res.json({ message: 'key entered too late, new key required'})
                break;
            case 1:
                res.json({ message: 'key entered too early, try again'})
                break;
            default:
                res.json({ message: 'something went wrong'})
        }
        
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: 'Error finding user' })
    })
})

router.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email,
            password: req.body.password
        }
    }).then(dbUser => {
        if(!dbUser) {
            res.status(400).json({ message: 'No user with that username' })
            return
        }
        //use User model's password validator


        req.session.save(() => {
            req.session.user_id = dbUser.user_id;
            req.session.username = dbUser.username;
            res.session.loggedIn = true

            res.json({ user: dbUser, message: 'You are now logged in!' })
        })
    })
})

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end()
        })
    }
    else {
        res.status(404).end()
    }
})

router.put('/:id', (req, res) => {
    User.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(dbUser => {
        if (!dbUser) {
            res.status(404).json({ message: 'No user found with this id' })
            return
        }
        res.json(dbUser)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUser => {
        if (!dbUser) {
            res.status(404).json({ message: 'No user found with this id' })
            return
        }
        res.json(dbUser)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

module.exports = router