const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize'); // Replace with your sequelize instance

const UserModel = sequelize.define('Users', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nama: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    telp: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true
});

module.exports = UserModel;