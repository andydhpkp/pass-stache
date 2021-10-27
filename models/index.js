const User = require('./User')
const Password = require('./Password')

User.hasMany(Password, {
    foreignKey: 'user_id'
})

Password.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
})

module.exports = { User, Password };

