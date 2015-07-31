let { toArray, extend, each } = require('../mindash');

function handles() {
  let constants = toArray(arguments);
  each(constants, function(constant) {
      if(!constant) {
        console.error(new Error('Handles is used with an empty constant'));
      }
  })

  return function (target, name, descriptor) {

    target.handlers = extend({}, target.handlers, {
      [name]: constants
    });

    return descriptor;
  };
}

module.exports = handles;
