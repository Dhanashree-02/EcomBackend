const express = require('express');
const connectDB = require('./db/db.js');
const routes = require('../src/router/index.js');

const app = express();

connectDB();
app.use(express.json());
app.use('/api', routes);

module.exports = app;
