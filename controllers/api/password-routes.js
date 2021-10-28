const router = require('express').Router()
const { Password, User } = require('../../models')

router.get('/', (req, res) => {
    Password.findAll({
        include: [
            {
                model: User,
                attributes: ['id', 'username', 'email']
            }
        ]
    })
    .then(dbPassword => res.json(dbPassword))
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

router.get('/:id', (req, res) => {
    Password.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: User,
                attributes: ['id', 'username', 'email']
            }
        ]
    })
    .then(dbPassword => {
        if(!dbPassword) {
            res.status(404).json({ message: 'No password found with this id' })
            return
        }
        res.json(dbPassword)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

router.post('/', (req, res) => {
    Password.create({
        associated_login_name: req.body.associated_login_name,
        nickname: req.body.nickname,
        //change this to req.session.user_id
        user_id: req.body.user_id
    })
    .then(dbPassword => res.json(dbPassword))
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

router.put('/:id', (req, res) => {
    Password.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(dbPassword => {
        if (!dbPassword) {
            res.status(404).json({ message: 'No password found with this id' })
            return
        }
        res.json(dbPassword)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

router.delete('/:id', (req, res) => {
    Password.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbPassword => {
        if (!dbPassword) {
            res.status(404).json({ message: 'No password found with this id' })
            return
        }
        res.json(dbPassword)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

module.exports = router