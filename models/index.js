const User = require('./User')
const Credential = require('./Credential')

User.hasMany(Credential, {
    foreignKey: 'user_id'
})

Credential.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
})

module.exports = { User, Credential };

