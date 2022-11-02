const express = require('express');
const cors = require('cors');
const globalErrHanlder = require('./utils/errHanlder');
const app = express();


//ROUTES
const userRoutes = require('./routes/userRoutes');

//USE MIDDLEWARE
app.use(express.json());
app.use(cors());
app.options('*', cors());


//ROUTES DECLARATION 
app.use('/api/v1/users', userRoutes);

app.use(globalErrHanlder);

module.exports = app;