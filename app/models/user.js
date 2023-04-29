const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Model Users
const userSchema = new Schema({
    username: String,
    password: String,
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    boards: [{
        type: Schema.Types.ObjectId,
        ref: 'Board'
    }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;