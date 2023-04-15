module.exports = (sequelize, Sequelize) => {
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
    
    return Card;
}