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
        alter: true
    }
    // automatically update database schema according to models
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Database connected...');
    })
    .catch(error => {
        console.log('Error:', error);
    });

// // auto sync  
// // chức năng này chỉ hoạt động khi một bảng đã có liên kết khóa ngoại
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require('../app/models/user')(sequelize, Sequelize);
db.board = require('../app/models/board')(sequelize, Sequelize);
db.card = require('../app/models/card')(sequelize, Sequelize);
db.list = require('../app/models/list')(sequelize, Sequelize);
db.atttachment = require('../app/models/atttachment')(sequelize, Sequelize);

db.user.hasMany(db.board, {
    foreignKey: 'user_id'
});

db.user.hasMany(db.card, {
    foreignKey: 'user_id'
});

db.user.hasMany(db.list, {
    foreignKey: 'user_id'
});

db.card.hasMany(db.atttachment, {
    foreignKey: 'card_id'
});

db.list.hasMany(db.card, {
    foreignKey: 'list_id'
});

db.board.hasMany(db.list, {
    foreignKey: 'board_id'
});

sequelize.sync();


module.exports = db;