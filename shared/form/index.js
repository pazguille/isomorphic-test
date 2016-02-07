'use strict';

// var diff = require('virtual-dom/diff');
// var patch = require('virtual-dom/patch');
// var virtualHTML = require('virtual-html');
// var createElement = require('virtual-dom/create-element');

var template = require('./templates/form.js');
// var diffhtml = require('diffhtml').innerHTML;
var diffhtml = require('morphdom');

var id = 0;

/**
 * Form
 */
function Form(options) {
  var self = this;

  this.container = options.container;
  this.options = options || {};
  this._id = id++;
  this.options.count = 0;
};

Form.prototype.toHTML = function() {
  return template(this.options);
};

Form.prototype.UIevents = function() {
  var self = this;

  this.mount();

  setInterval(function() {
    self.options.count++;
    self.render();
  }, 1000);

  $(this.container)

    .on('submit.' + this._id, function() {
      alert('foo');
    })

    .on('click.' + this._id, '.js-refresh', function() {
      self.options.count = 0;
      self.refresh();
    });
}

Form.prototype.mount = function() {
  // this.virtual = virtualHTML(template(this.options));
  // this.rootNode = createElement(this.virtual);
  // $(this.container).html(this.rootNode);
  $(this.container).html(template(this.options));
};

Form.prototype.render = function() {
  // var newTree = virtualHTML(template(this.options));
  // var patches = diff(this.virtual, newTree);
  // this.rootNode = patch(this.rootNode, patches);
  // this.virtual = newTree;
  // diffhtml(document.querySelector(this.container), template(this.options), { enableWorker: true });
  diffhtml(document.querySelector(this.container).firstChild, template(this.options));
}

Form.prototype.refresh = function() {
  this.mount();
  this.render();
};

Form.prototype.destroy = function() {
  this.rootNode = undefined;
  this.virtual = undefined;
  $(this.container)
    .html()
    .off('submit.'+this._id)
    .off('click.'+this._id);
};

/**
 * Expose Form
 */
module.exports = Form;
