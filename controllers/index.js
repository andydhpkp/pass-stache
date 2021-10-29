const router = require('express').Router()

const apiRoutes = require('./api')
const dashboardRoutes = require('./dashboard-routes')
const homepageRoutes = require('./home-routes')

router.use('/api', apiRoutes)
router.use('/dashboard', dashboardRoutes)
router.use('/', homepageRoutes)

module.exports = router