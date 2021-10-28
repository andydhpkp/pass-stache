const { Credential } = require('../models')

const credentialData = [
    {
        nickname: 'hulu',
        login_name: 'olebob',
        password: 'billybob69',
        user_id: 1
    },
    {
        nickname: 'netflix',
        login_name: 'olebob2',
        password: 'billybob69',
        user_id: 1
    },
    {
        nickname: 'mybank',
        login_name: 'bigbob',
        password: 'billybob69',
        user_id: 1
    },
    {
        nickname: 'disney+',
        login_name: 'margeincharge',
        password: 'margemargemarge',
        user_id: 2
    },
    {
        nickname: 'espn',
        login_name: 'grammaMarge',
        password: 'margemargemarge',
        user_id: 2
    },
    {
        nickname: 'cvs pharmacy',
        login_name: 'Margespills',
        password: 'margemargemarge',
        user_id: 2
    },
    {
        nickname: 'netflix',
        login_name: 'donald12',
        password: 'iamdonald',
        user_id: 3
    },
    {
        nickname: 'tesla',
        login_name: 'bigdon',
        password: 'iamdonald',
        user_id: 3
    },
    {
        nickname: 'golf club',
        login_name: 'bigDon1',
        password: 'iamdonald',
        user_id: 3
    },
]

const seedCredentials = () => Credential.bulkCreate(credentialData);

module.exports = seedCredentials;