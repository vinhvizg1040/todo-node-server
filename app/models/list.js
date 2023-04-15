module.exports = (sequelize, Sequelize) => {
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

    return List;
}
