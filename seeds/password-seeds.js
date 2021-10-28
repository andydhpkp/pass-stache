const { Password } = require('../models')

const passwordSeeds = [
    {
        associated_login_name: 'exampleUsername',
        nickname: 'firstNickname',
        user_id: 1
    },
    {
        associated_login_name: 'anotherExampleUsername',
        nickname: 'anotherNickname',
        user_id: 2
    },
    {
        associated_login_name: 'thisOtherExample',
        nickname: 'theThirdNickname',
        user_id: 3
    },
    {
        associated_login_name: 'finalExampleSeed',
        nickname: 'lastSeedNickname',
        user_id: 4
    },
    {
        associated_login_name: 'userOneOtherExampleUsername',
        nickname: 'userOneOtherNickname',
        user_id: 1
    },
    {
        associated_login_name: 'userTwoAnotherExampleUsername',
        nickname: 'UserTwoAnotherNickname',
        user_id: 2
    },
    {
        associated_login_name: 'userThreeThisOtherExample',
        nickname: 'userThreeTheThirdNickname',
        user_id: 3
    },
    {
        associated_login_name: 'userFourFinalExampleSeed',
        nickname: 'userFourLastSeedNickname',
        user_id: 4
    }
]

const seedPasswords = () => Password.bulkCreate(passwordSeeds)

module.exports = seedPasswords

