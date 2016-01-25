'user strict';

/**
 * Module dependencies
 */
var jade = require('jade');

var templatePath = require.resolve('./form.jade');
var template = jade.compileFile(templatePath, {'cache': true});

/**
 * Expose template
 */
module.exports = template;
