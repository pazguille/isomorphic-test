'user strict';

/**
 * Module dependencies
 */
var app = module.exports = require('express').Router();
var formHome = require('shared/home-form');

var jade = require('jade');
function Template(path) {
  this._template = jade.compileFile(require.resolve(path));
}
Template.prototype.render = function (locals, res) {
  res.header('Content-Type', 'text/html; charset=utf-8');
  var html = this._template(locals);
  res.write(html);
  res.end();
};


var template = new Template('./index.jade');

/**
 * Render
 */
function render(req, res) {
  var form = formHome();
  template.render({
    'form': form.toHTML()
  }, res);
}

/**
 * Routes
 */
app.get('/', render);
