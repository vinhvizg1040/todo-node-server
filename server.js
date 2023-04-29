const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoute = require('./app/routes/userRoute');
const adminRoute = require('./app/routes/adminRoute');
const boardRoute = require('./app/routes/boardRoute');
const listRoute = require('./app/routes/listRoute');
require('./config/mongodb');

const app = express();

app.use(cors({
    origin: '*' //cho tất cả nguồn
}));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use('/users', userRoute);
app.use('/admin', adminRoute);
app.use('/board', boardRoute);
app.use('/list', listRoute);

app.listen(3001, () => {
    console.log('Server started on port 3001');
});