const mongoose = require('mongoose');
const DB_URI = "mongodb+srv://vinhvizg1040:Anhvi1040@vinhvizg.dlmjt0y.mongodb.net/td_list";


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