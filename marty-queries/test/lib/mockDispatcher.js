var _ = require('marty-core')._;
var ActionPayload = require('marty-core').ActionPayload;

function MockDispatcher() {
  this.id = 'MockDispatcher';

  this.register = _.noop;
  this.dispatch = dispatch;
  this.dispatchedActions = [];
  this.dispatchAction = dispatch;
  this.getActionWithType = getActionWithType;

  function getActionWithType(actionType) {
    return _.find(this.dispatchedActions, function (action) {
      return action.type === actionType;
    });
  }

  function dispatch(action) {
    this.dispatchedActions.push(new ActionPayload(action));
  }
}

module.exports = MockDispatcher;