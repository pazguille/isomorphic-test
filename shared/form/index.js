'use strict';

var virtualdom = require('virtual-dom');
var jadeVirtualdom = require('jade-virtualdom');

var template = require('./templates/form.js');
var id = 0;

/**
 * Form
 */
function Form(options) {
  this.container = options.container;
  this.options = options || {};
  this._id = id++;
  // this.virtual = jadeVirtualdom(template());
  if (typeof window !== 'undefined') {
    window.jadeVirtual = jadeVirtualdom;
  }
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
