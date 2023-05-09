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
    
        const list_id = "6458aca672594c6c22e4fcf7";
        const board_id = "6458ac8772594c6c22e4fcf3";
        const user_id = "6443a931706c5fba6c95c28b";
        const name = 'name33'        
        
        //Checking User having this board_id (feature: checking User can edit this Board)
        const isBoardExists = await User.find({_id: user_id, boards: board_id}).count() > 0;
        if(!isBoardExists){
            console.log('isBoardExists = false');
        }
        
        // Checking user's Board having list_id
        const isListExists = await Board.find({_id: board_id, lists: list_id}).count() > 0;
        if(!isListExists){
            console.log('isListExists = false');
        }



        const lists = await List.updateOne({_id: list_id}, {name: name});

        if(lists.modifiedCount !== 1){
            console.log(lists.modifiedCount);
        }
        
        console.log(await List.find({_id: list_id}));

    // console.log(mongoose.connection.db);
}

test();