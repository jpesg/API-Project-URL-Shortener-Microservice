'use strict';

var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var cors = require('cors');

var app = express();

var url_routes = require('./routes/urlShorten');

// Basic Configuration 
//var port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
// mongoose.connect(process.env.MONGOLAB_URI);


app.use(cors());

/** this project needs to parse POST bodies **/
// you should mount the body-parser here


//Body parser configuration
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

//Routes
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});

  
// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



app.use('/api/', url_routes);



module.exports = app;