'user strict';

/**
 * Module dependencies
 */
var app = module.exports = require('express').Router();
var formHome = require('lib/home-form');

/**
 * Render
 */
function render(req, res) {
  var form = formHome();
  res.render('index', {
    'form': form.toHTML()
  });
}

/**
 * Routes
 */
app.get('/', render);
