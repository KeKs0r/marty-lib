let findApp = require('../core/findApp');
let { isArray, extend } = require('../mindash');

module.exports = function (React) {
  let ApplicationContainer = React.createClass({
    childContextTypes: {
      marty: React.PropTypes.object
    },
    getChildContext() {
      return { marty: findApp(this) };
    },
    render() {
      let { app, children } = this.props;

      if (children) {
        if (isArray(children)) {
          return <span>{React.Children.map(children, cloneWithApp)}</span>;
        } else {
          return cloneWithApp(children);
        }
      }

      function cloneWithApp(element) {
        return React.createElement(element.type, extend({
          app: app
        }, element.props));
      }
    }
  });

  return ApplicationContainer;
};
