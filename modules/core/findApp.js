"use strict";

function findApp(obj) {
  if (obj) {
    if (obj.context && obj.context.marty) {
      return obj.context.marty;
    }

    if (obj.props && obj.props.marty) {
      return obj.props.marty;
    }
  }
}

module.exports = findApp;