const Sequelize = require('sequelize');
const sequelize = require('../../config/database');
const User = require('./user');
const List = require('./list');

const Card = sequelize.define('card', {
    card_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING(255),
        allowNull: true
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    deadline: {
        type: Sequelize.DATE,
        allowNull: true
    },
    is_done: {
        type: Sequelize.BOOLEAN,
        allowNull: true
    }
});

Card.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Card, { foreignKey: 'user_id' });

Card.belongsTo(List, { foreignKey: 'list_id' });
List.hasMany(Card, { foreignKey: 'list_id' });

module.exports = Card;