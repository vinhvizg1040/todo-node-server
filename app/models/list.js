const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Model Lists
const listSchema = new Schema({
    name: String,
    boardId: {
        type: Schema.Types.ObjectId,
        ref: 'Board'
    },
    cards: [{
        type: Schema.Types.ObjectId,
        ref: 'Card'
    }],
    order: Number
});

const List = mongoose.model('List', listSchema);

module.exports = List;