#!/usr/bin/env nodemon
require('dotenv').config();

const express = require('express');
const app = express();
const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;
var cookieSession = require('cookie-session');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const bodyParser =require("body-parser");
const morgan     = require("morgan");
const cors = require('cors');
const path = require('path');
const { dirname } = require('path');

//Routes
 const usersRouter = require(__dirname+'/routes/users');
 const partnersRouter = require(__dirname+'/routes/partners');
 const projectsRouter = require(__dirname+'/routes/projects');
 const tasksRouter = require(__dirname+'/routes/tasks');


//Moteur de template 
app.set('view engine','ejs');


app.use(express.static(__dirname+'/views'));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
//Middleware
//app.use(cookieSession({keys: ['key1', 'key2']}));
app.use(session({
  secret: 'thatsecretthinggoeshere',
  resave: false,
  saveUninitialized: true,
  
}));



app.use(morgan('dev'));
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())


app.use(function(req, res, next){
  res.locals.message = req.flash('message');
  next();
});

 app.use('/partners', usersRouter);
 app.use('/', projectsRouter);
app.use('/partners', partnersRouter);

require('./config/passport')(passport)

app.listen(port, hostname, () => {
    console.log(`Example app listening at http://${hostname}:${port}`)
  });
