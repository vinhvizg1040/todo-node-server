const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING(40),
        allowNull: false
    },
    password: {
        type: Sequelize.STRING(60),
        allowNull: false
    },
    role: {
        type: Sequelize.ENUM('admin', 'user'),
        defaultValue: 'user',
        allowNull: false
    }
});

module.exports = User;