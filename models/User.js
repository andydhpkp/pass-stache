const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create User model
class User extends Model {
    // add a password check method here
}

// create columns for User model
User.init(
    {
        
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        master_password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [10]
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
)

module.exports = User;