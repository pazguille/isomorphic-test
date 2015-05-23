'use strict';

var Form = require('../form');

module.exports = function(options) {
  return new Form({
    'container': '.main',
    'legend': 'From',
    'submitLabel': 'Send'
  });
};