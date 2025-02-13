const express = require ('express')
const mongoose = require('mongoose');
require ('dotenv').config()
const app = require("./src/app.js");


// const app = express()
// const connectDb = require("./src/db/db.js")

// connectDb()
const PORT = process.env.PORT || 3000

app.use(express.json());
app.listen (PORT , () => 
{
    console.log (`server is running on : ${PORT}`)
})