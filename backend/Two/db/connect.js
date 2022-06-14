require('dotenv').config();
var pgp = require("pg-promise")(/*options*/);
var username=process.env.USERNAME_DB, 
    password=process.env.PASSWORD_DB,
    port=process.env.PORT_DB,
    host=process.env.HOST,
    namedb=process.env.NAME_DB;
var db = pgp("postgres://"+username+":"+password+"@"+host+":"+port+"/"+namedb);

// Exporting the database object for shared use:
module.exports = db;