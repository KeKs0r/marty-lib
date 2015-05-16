'use strict';

var _ = require('../mindash');
var inject = require('../core/inject');
var uuid = require('../core/utils/uuid');
var StoreObserver = require('../core/storeObserver');
var reservedKeys = ['listenTo', 'getState', 'getInitialState'];

module.exports = function (React) {
  return function createStateMixin(options) {
    if (!options) {
      throw new Error('The state mixin is expecting some options');
    }

    var instanceMethods = _.omit(options, reservedKeys);

    var mixin = _.extend({
      contextTypes: {
        app: React.PropTypes.object
      },
      componentDidMount: function componentDidMount() {
        var component = {
          id: this.__id,
          displayName: this.displayName || this.constructor.displayName };

        this.__observer = new StoreObserver({
          component: component,
          app: this.context.app,
          stores: options.listenTo,
          onStoreChanged: this.onStoreChanged
        });
      },
      onStoreChanged: function onStoreChanged() {
        this.setState(this.getState());
      },
      componentWillUnmount: function componentWillUnmount() {
        if (this.__observer) {
          this.__observer.dispose();
        }
      },
      componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        var oldProps = this.props;
        this.props = nextProps;

        var newState = this.getState();

        this.props = oldProps;
        this.setState(newState);
      },
      getState: function getState() {
        return (options.getState || _.noop).call(this);
      },
      getInitialState: function getInitialState() {
        var _this = this;

        Object.defineProperty(this, 'app', {
          get: function get() {
            if (_this.context) {
              return _this.context.app;
            }
          }
        });

        inject(this, options);

        var el = this._currentElement;

        if (!this.displayName && el && el.type) {
          this.displayName = el.type.displayName;
        }

        this.state = {};
        this.__id = uuid.type('Component');

        if (options.getInitialState) {
          this.state = options.getInitialState.call(this);
        }

        this.state = _.extend(this.state, this.getState());

        return this.state;
      }
    }, instanceMethods);

    return mixin;
  };
};