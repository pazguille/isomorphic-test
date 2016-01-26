'use strict';

var template = require('./templates/form.js');
var id = 0;

var VNode = require('virtual-dom/vnode/vnode');
var VText = require('virtual-dom/vnode/vtext');
var createElement = require('virtual-dom/create-element');
var diff = require('virtual-dom/diff');
var patch = require('virtual-dom/patch');


var convertHTML = require('html-to-vdom')({
    VNode: VNode,
    VText: VText
});

/**
 * Form
 */
function Form(options) {
  this.container = options.container;
  this.options = options || {};
  this._id = id++;

  this.virtual = convertHTML(template(this.options));
  var rootNode = createElement(this.virtual);
  $(this.container)[0].appendChild(rootNode);

  var self = this;
  this.options.count = 0;
  setInterval(function () {
    self.options.count++;
    var newTree = convertHTML(template(self.options));
    var patches = diff(self.virtual, newTree);
    rootNode = patch(rootNode, patches);
    self.virtual = newTree;
  }, 1000);
};

Form.prototype.toHTML = function() {
  return template(this.options);
};

Form.prototype.UIevents = function() {
  var self = this;

  $(this.container)

    .on('submit.'+this._id, function() {
      alert('foo');
    })

    .on('click.'+this._id, '.js-refresh', function() {
      self.refresh();
    });
}

Form.prototype.refresh = function() {
  $(this.container).html(this.toHTML());
};

Form.prototype.destroy = function() {
  $(this.container)
    .html()
    .off('submit.'+this._id)
    .off('click.'+this._id);
};

/**
 * Expose Form
 */
module.exports = Form;
