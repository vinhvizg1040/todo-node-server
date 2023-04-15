module.exports = (sequelize, Sequelize) => {
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
    
    return Board;
}