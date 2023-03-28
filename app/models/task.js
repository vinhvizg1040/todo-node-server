const Sequelize = require('sequelize');
const sequelize = require('../../config/database');
const User = require('./user');

const Task = sequelize.define('tasks', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    endDate: {
        type: Sequelize.DATE,
        allowNull: false
    },
    createDate: {
        type: Sequelize.DATE,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('pending', 'completed'),
        defaultValue: 'pending'
    }
});

Task.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Task, { foreignKey: 'userId' });

module.exports = Task;