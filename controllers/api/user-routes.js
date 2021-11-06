const router = require('express').Router()
const { sendEmail, verifyToken, createToken } = require('../../utils/2fa')
const twoFactor = require('node-2fa')
const { User, Credential } = require('../../models')
require('dotenv').config();



router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['master_password'] }
    })
        .then(dbUser => {
            res.json(dbUser)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['master_password'] },
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

//create new user (register)
router.post('/', (req, res) => {
    // create a new 2fa secret to be kept in user.secret
    let newSecret = twoFactor.generateSecret()

    User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        master_password: req.body.master_password,
        secret: newSecret.secret
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

// login route
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(dbUser => {

        if (!dbUser) {
            res.status(400).json({ message: 'No user with that username' })
            return
        }

        //use User model's password validator
        const validPassword = dbUser.checkPassword(req.body.master_password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }

        let newToken = twoFactor.generateToken(dbUser.secret).token
        console.log(`newToken: ${newToken}`);

        sendEmail(req.body.email, newToken);

        // save the secret, user id, and name in cookies, but do not set loggedIn to true yet
        req.session.save(() => {
            req.session.secret = dbUser.secret;
            req.session.user_id = dbUser.id;
            req.session.name = dbUser.first_name;

            console.log(`Cookies saved (secret: ${req.session.secret}, id: ${req.session.user_id}, name: ${req.session.name})`);
        })

        res.json({ message: 'Successful token generation'})
    })
})

// verify user
router.post('/verify/:token', (req, res) => {
    // run verification check, comparing the user's secret from db and the user input token from req.params.token
    console.log(`Session working? secret: ${req.session.secret}`)
    console.log(`Verifying this secret: ${req.session.secret} against this token: ${req.params.token}`)

    let verified = twoFactor.verifyToken(req.session.secret, req.params.token)

    switch(verified.delta) {
        case 0:
            alert('verified')
            break;
        case -1:
            alert('the token was entered too late, please try again!')
            break;
        case 1:
            alert('the token was entered too early, please try again!')
            break;
        default:
            alert('Something went wrong, please try again!')
    }

    // console.log(`verifying user number ${id}: ${req.session.name}`)

    // after verification passes, set loggedIn to true
    // req.session.save(() => {
    //     req.session.user_id = req.session.user_id;
    //     req.session.name = req.session.name
    //     req.session.loggedIn = true;

    //     res.json({ user: dbUser, message: 'You are now logged in!' })
    // })
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