const { User } = require('../models');

const userSeeds = [
    {
        username: 'exampleUsername',
        email: 'example@gmail.com',
        password: 'example1234'
    },
    {
        username: 'anotherExampleUsername',
        email: 'seeds@gmail.com',
        password: 'pass123456'
    },
    {
        username: 'thisOtherExample',
        email: 'other@gmail.com',
        password: 'another432'
    },
    {
        username: 'finalExampleSeed',
        email: 'email@gmail.com',
        password: '13password'
    }
]

const seedUsers = () => User.bulkCreate(userSeeds);

module.exports = seedUsers;