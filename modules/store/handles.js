'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('../mindash');

var toArray = _require.toArray;
var extend = _require.extend;
var each = _require.each;

function handles() {
  var constants = toArray(arguments);
  each(constants, function (constant) {
    if (!constant) {
      console.error(new Error('Handles is used with an empty constant'));
    }
  });

  return function (target, name, descriptor) {

    target.handlers = extend({}, target.handlers, _defineProperty({}, name, constants));

    return descriptor;
  };
}

module.exports = handles;