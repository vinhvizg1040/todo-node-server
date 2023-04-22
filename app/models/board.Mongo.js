const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Model Boards
const boardSchema = new Schema({
    name: String,
    lists: [{
        type: Schema.Types.ObjectId,
        ref: 'List'
    }]
});

const Board = mongoose.model('Board', boardSchema);
module.exports = Board;
