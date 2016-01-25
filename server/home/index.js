'user strict';

/**
 * Module dependencies
 */
var app = module.exports = require('express').Router();
var formHome = require('shared/home-form');

var jade = require('jade');
var templatePath = require.resolve('./index.jade');
var template = jade.compileFile(templatePath, {'cache': true});

/**
 * Render
 */
function render(req, res) {
  var form = formHome();

  var html = template({
    'form': form.toHTML()
  });

  res.header('Content-Type', 'text/html; charset=utf-8');
  res.write(html);
  res.end();
}

/**
 * Routes
 */
app.get('/', render);
