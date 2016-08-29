'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createClass = createClass;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createClass(store) {
  var transform = arguments.length <= 1 || arguments[1] === undefined ? function (d) {
    return d;
  } : arguments[1];

  // return a new function that returns a new React class that calls the renderFunc
  return function (renderFunc) {
    return _react2.default.createClass({
      getInitialState: function getInitialState() {
        return transform(store.getState());
      },
      componentDidMount: function componentDidMount() {
        this.unsubscribe = store.subscribe(this.handleStoreChange);
      },
      componentWillUnmount: function componentWillUnmount() {
        if (typeof this.unsubscribe === 'function') {
          this.unsubscribe();
        }
      },
      handleStoreChange: function handleStoreChange() {
        if (store && typeof store.getState === 'function') {
          this.setState(transform(store.getState()));
        }
      },
      render: function render() {
        return renderFunc(this.state);
      }
    });
  };
}
