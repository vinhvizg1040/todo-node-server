const Sequelize = require('sequelize');
const mysql = require('mysql2');
const config = require('./config');

const dbConfig = config.database;
const host = dbConfig.host;
const user = dbConfig.user;
const password = dbConfig.password;
const database = dbConfig.database;

const sequelize = new Sequelize(database, user, password, {
    host: host,
    dialect: 'mysql',
    logging: false,
    define: {
        timestamps: false,
        // don't add timestamp fields (createdAt, updatedAt) 
        // for each table
        freezeTableName: true
        // Enforcing the table name to be equal to the model name
    },
    sync: {
        force: true
    }
    // automatically update database schema according to models
});

// // auto sync  
// // chức năng này chỉ hoạt động khi một bảng đã có liên kết khóa ngoại
// sequelize.sync();


module.exports = sequelize;