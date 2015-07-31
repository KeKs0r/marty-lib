'use strict';

var _ = require('../mindash');
var getHandlers = require('./getHandlers');
var ActionHandlerNotFoundError = require('../errors/actionHandlerNotFoundError');
var ActionPredicateUndefinedError = require('../errors/actionPredicateUndefinedError');

function validateHandlers(store) {
  _.each(getHandlers(store), function (actionPredicate, handlerName) {
    var actionHandler = store[handlerName];

    if (_.isUndefined(actionHandler) || _.isNull(actionHandler)) {
      console.error(new ActionHandlerNotFoundError(handlerName, store));
    }

    if (!actionPredicate) {
      console.error(new ActionPredicateUndefinedError(handlerName, store));
    }
  });
}

module.exports = validateHandlers;