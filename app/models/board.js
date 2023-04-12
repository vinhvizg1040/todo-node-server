const Sequelize = require('sequelize');
const sequelize = require('../../config/database');
const User = require('./user');

const Board = sequelize.define('board', {
    board_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING(255),
        allowNull: false
    }
});

Board.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Board, { foreignKey: 'user_id' });

module.exports = Board;