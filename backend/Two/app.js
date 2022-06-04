#!/usr/bin/env nodemon
const express = require('express');
const bodyParser =require("body-parser");
const morgan     = require("morgan");
const cors = require('cors');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 3000;
const hostname = process.env.API_URL|| '127.0.0.1';

//Routes
const partnersRouter = require('../Two/routes/partners');
const modulesRouter= require('../Two/routes/modules')
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
  });
app.use('/partners', partnersRouter);
app.use('/modules',modulesRouter);

app.get('/', (req, res) => {
    res.json({
        message: 'Bien reçu'
    });
});



app.listen(port, hostname, () => {
    console.log(`Example app listening at http://${hostname}:${port}`)
  });