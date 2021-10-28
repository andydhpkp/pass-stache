const { Password } = require('../models')

const passwordData = [
    {
        nickname: 'hulu',
        associated_login_name: 'olebob',
        user_id: 1
    },
    {
        nickname: 'netflix',
        associated_login_name: 'olebob2',
        user_id: 1
    },
    {
        nickname: 'mybank',
        associated_login_name: 'bigbob',
        user_id: 1
    },
    {
        nickname: 'disney+',
        associated_login_name: 'margeincharge',
        user_id: 2
    },
    {
        nickname: 'espn',
        associated_login_name: 'grammaMarge',
        user_id: 2
    },
    {
        nickname: 'cvs pharmacy',
        associated_login_name: 'Margespills',
        user_id: 2
    },
    {
        nickname: 'netflix',
        associated_login_name: 'donald12',
        user_id: 3
    },
    {
        nickname: 'tesla',
        associated_login_name: 'bigdon',
        user_id: 3
    },
    {
        nickname: 'golf club',
        associated_login_name: 'bigDon1',
        user_id: 3
    },
]

const seedPasswords = () => Password.bulkCreate(passwordData);

module.exports = seedPasswords;