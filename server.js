const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const userRoute = require('./app/routes/userRoute');
const adminRoute = require('./app/routes/adminRoute');
const taskRoute = require('./app/routes/taskRoute');

const app = express();

app.use(cors({
    origin: '*' //cho tất cả nguồn
}));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

sequelize
    .authenticate()
    .then(() => {
        console.log('Database connected...');
    })
    .catch(error => {
        console.log('Error:', error);
    });


app.use('/tasks', taskRoute)
app.use('/users', userRoute);
app.use('/admin', adminRoute);

app.listen(3001, () => {
    console.log('Server started on port 3001');
});