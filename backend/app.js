const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser =  require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const Database = require('./config/db').Database;
const port = process.env.PORT || 9001;


mongoose.connect(Database, {useNewUrlParser : true})
.then(success => {
    console.log('Connect success Mongodb');
})
.catch(err => {
    console.log('Connect failed Mongodb');
});

require('dotenv').config();


app.use(cors());
app.use(bodyParser.json());

const userRoutes = require('./routes/users');
const exrciseRoutes = require('./routes/exrcises');

app.use('/users',userRoutes);
app.use('/exercise',exrciseRoutes);


app.listen(port, () => {
    console.log('Connect Successfly Port : ' + port);
});