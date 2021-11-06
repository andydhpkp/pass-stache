const router = require('express').Router()

const verifyRoutes = require('./verify-routes')
const apiRoutes = require('./api')
const dashboardRoutes = require('./dashboard-routes')
const homepageRoutes = require('./home-routes')

router.use('/api', apiRoutes)
router.use('/dashboard', dashboardRoutes)
router.use('/', homepageRoutes)
router.use('/verify', verifyRoutes)

module.exports = router