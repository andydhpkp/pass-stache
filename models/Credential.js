const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create Credential model
class Credential extends Model {}

Credential.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        nickname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        login_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'credential'
    }
)

module.exports = Credential;