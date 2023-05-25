const express = require('express');
const cors = require('cors');
const mongo = require('mongoose');
const mongoConnection = require('./Connections/Keys');
const app = express();
app.use(cors());
const PORT = 5000;

//IMPORTING SCHEMAS
require('./Models/Models');


//CONNECTION TO MONGO DATABASE
mongo.connect(mongoConnection);

mongo.connection.on('connected', ()=>{
    console.log("Successfully connected to Database");
});

mongo.connection.on('error', ()=>{
    console.log("Couldn't connected to Database");
});

app.listen(PORT, ()=>{
    console.log("Server is running");
});