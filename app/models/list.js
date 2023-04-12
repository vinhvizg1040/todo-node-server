const Sequelize = require('sequelize');
const sequelize = require('../../config/database');
const User = require('./user');
const Board = require('./board');

const List = sequelize.define('list', {
    list_id: {
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

List.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(List, { foreignKey: 'user_id' });

List.belongsTo(Board, { foreignKey: 'board_id' });
Board.hasMany(List, { foreignKey: 'board_id' });



module.exports = List;