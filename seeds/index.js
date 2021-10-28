const seedUsers = require('./user-seeds');
const seedPasswords = require('./password-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('\n---- Database Synced ----\n')

    await seedUsers();
    console.log('\n---- Database Synced ----\n')

    await seedPasswords();
    console.log('\n---- Database Synced ----\n')

    process.exit(0);
}

seedAll();