const seedUsers = require('./user-seeds');
const seedCredentials = require('./credential-seeds');

const sequelize = require('../config/connection');
const { User, Credential } = require('../models');



const seedAll = async () => {
    await sequelize.sync({force: true});
    console.log('\n---- Database Synced ----\n')

    await seedUsers();
    console.log('\n---- Users Seeded ----\n')

    await seedCredentials();
    console.log('\n---- Credentials Seeded ----\n')

    process.exit(0);
}

seedAll();
