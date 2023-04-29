const mongoose = require('mongoose');
const config = require('./config/config');
const DB_URI = config.mongodb.url;


mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', (err) => {
    console.log(`MongoDB error: ${ err }`);
});

db.once('open', () => {
    console.log('Connected to MongoDB');
});

// const Board = require('./app/models/board');
// const User = require('./app/models/user');
// async function test() {
//     // const user_id = '6443a931706c5fba6c95c28b';
//     // const user_id2 = '6448d6f7978ad0ca755a2c07';

//     // const board_id = '6448d6dc978ad0ca755a2bfd';
//     // const new_name = 'new name';

//     // const user = await User.find({_id: user_id, boards: board_id}).count() > 0;

//     // if(!user){
//     //     return user;
//     // }

//     // const board = await Board.updateOne({_id: board_id}, {name: new_name});

//     // console.log(board.modifiedCount);

//     console.log(mongoose.connection.db);
// }

// test();