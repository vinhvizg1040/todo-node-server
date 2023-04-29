const mongoose = require('mongoose');
const config = require('./config');
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