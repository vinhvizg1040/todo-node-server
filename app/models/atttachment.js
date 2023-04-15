module.exports = (sequelize, Sequelize) => {
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

    return Attachment;
}

