'user strict';

/**
 * Modules
 */
var express = require('express');
var bodyParser = require('body-parser');

/**
 * Create express app
 */
var app = module.exports = express();

/**
 * Set jade templates
 */
// app.set('views', __dirname + '/home');
// app.set('view engine', 'jade');

/**
 * Set static directory
 */
app.use(express.static(__dirname + '/../public'));

/**
 * Body parser
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
 * Home router
 */
app.use('/', require('./home'));

/**
 * Server listen on port
 */
app.listen(3030, "0.0.0.0", function() {
  console.log('App listening on port 3030.');
});
