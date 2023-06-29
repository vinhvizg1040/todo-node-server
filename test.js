const mongoose = require('mongoose');
const config = require('./config/config');
const DB_URI = config.mongodb.url;


mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', (err) => {
    console.log(`MongoDB error: ${err}`);
});

db.once('open', () => {
    console.log('Connected to MongoDB');
});


const List = require('./app/models/list');
const Board = require('./app/models/board');
const User = require('./app/models/user');
const Card = require('./app/models/card');

async function test() {


    const data = [
        {
            "_id": "644a4a8ae2e630074d40792a",
            "name": "listName 12",
            "cards": [
                {
                    "_id": "64589935bd52e678ef5efba4",
                    "name": "cardName 1"
                }
            ]
        },
        {
            "_id": "645777bc3fdce6639ff3d227",
            "name": "listName 1",
            "cards": []
        }
    ];

    const input = [
        {
          "name": "John",
          "control": "1",
          "available": "true",
          
        },
        {
          "name": "Peter",
          "control": "2",
          "available": "true"
        }
      ];

    let res = data.reduce((acc, user) => {
        let { _id, name, cards } = user;
        acc[_id] = cards;

        return acc;
    }, {});

    console.log(res);

    // console.log(mongoose.connection.db);
}

test();