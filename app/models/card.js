const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Model Cards
const cardSchema = new Schema({
    name: String,
    description: String,
    dueDate: Date,
    priority: {
        type: Number,
        default: 0
    },
    labels: [String],
    listId: {
        type: Schema.Types.ObjectId,
        ref: 'List'
    }
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;