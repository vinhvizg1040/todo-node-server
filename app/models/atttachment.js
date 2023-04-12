const Sequelize = require('sequelize');
const sequelize = require('../../config/database');
const Card = require('./card');

const Attachment = sequelize.define('attachment', {
    attachment_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    file_name: {
        type: Sequelize.STRING(255),
        allowNull: false 
    },
    path: {
        type: Sequelize.STRING(255),
        allowNull: false 
    }
});

Attachment.belongsTo(Card, { foreignKey: 'card_id' });
Card.hasMany(Attachment, { foreignKey: 'card_id' });

module.exports = Attachment;