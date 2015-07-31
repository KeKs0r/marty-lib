'use strict';

var findApp = require('../core/findApp');
var appProperty = require('../core/appProperty');

module.exports = function (React) {
  return function () /*...dependencies*/{
    var contextTypes = {
      marty: React.PropTypes.object
    };

    return {
      contextTypes: contextTypes,
      childContextTypes: contextTypes,
      getChildContext: function getChildContext() {
        return { marty: findApp(this) };
      },
      getInitialState: function getInitialState() {
        appProperty(this);

        return {};
      }
    };
  };
};