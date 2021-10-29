const router = require('express').Router()

const userRoutes = require('./user-routes.js')
const credentialRoutes = require('./credential-routes')

router.use('/users', userRoutes)
router.use('/credentials', credentialRoutes)

module.exports = router