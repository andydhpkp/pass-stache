const router = require('express').Router()
const { User, Credential } = require('../../models')

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

//nickname, login_name, password, user_id
router.post('/', (req, res) => {
    User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        email: req.body.email,
        master_password: req.body.master_password
    })
    .then(dbUser => {
        req.session.save(() => {
            req.session.user_id = dbUser.id;
/*             req.session.first_name = dbUser.first_name;
            req.session.last_name = dbUser.last_name;
            res.session.username = dbUser.username;
            req.session.email = dbUser.email;
            req.session.master_password = dbUser.master_password; */
            req.session.loggedIn = true;

            res.json(dbUser)
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
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