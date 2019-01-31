'use strict'

var express = require('express');
var urlShortenController = require('../controllers/urlShorten');

var api = express.Router();

api.get('/probando-controlador', urlShortenController.pruebas);
api.get('/shorturl/:shorturl?', urlShortenController.getShortUrl);
api.post('/shorturl/new/:url?', urlShortenController.postShortUrl);
module.exports = api;