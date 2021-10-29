const router = require('express').Router()
const { Credential, User } = require('../../models')

router.get('/', (req, res) => {
    Credential.findAll({
        include: [
            {
                model: User,
                attributes: ['id', 'username', 'first_name', 'last_name', 'email', 'master_password']
            }
        ]
    })
    .then(dbCredential => res.json(dbCredential))
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

router.get('/:id', (req, res) => {
    Credential.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: User,
                attributes: ['id', 'username', 'first_name', 'last_name', 'email', 'master_password']
            }
        ]
    })
    .then(dbCredential => {
        if(!dbCredential) {
            res.status(404).json({ message: 'No credential found with this id' })
            return
        }
        res.json(dbCredential)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

router.post('/', (req, res) => {
    Credential.create({
        nickname: req.body.nickname,
        login_name: req.body.login_name,
        password: req.body.password,
        //change this to req.session.user_id
        user_id: req.body.user_id
    })
    .then(dbCredential => res.json(dbCredential))
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

router.put('/:id', (req, res) => {
    Credential.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(dbCredential => {
        if (!dbCredential) {
            res.status(404).json({ message: 'No credential found with this id' })
            return
        }
        res.json(dbCredential)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

router.delete('/:id', (req, res) => {
    Credential.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbCredential => {
        if (!dbCredential) {
            res.status(404).json({ message: 'No credential found with this id' })
            return
        }
        res.json(dbCredential)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

module.exports = router