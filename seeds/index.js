const seedUsers = require('./user-seeds')
const seedPasswords = require('./password-seeds')

const sequelize = require('../config/connection')

const seedAll = async () => {
    await sequelize.sync({ force: true })
    console.log('-------------')
    await seedUsers()
    console.log('-------------')
    await seedPasswords()
    console.log('-------------')

    process.exit(0)
}

seedAll() 