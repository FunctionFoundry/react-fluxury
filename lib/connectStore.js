'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.connectStore = connectStore;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function connectStore(store, ComposedComponent, transform) {
  return class ConnectToStore extends _react2.default.Component {

    constructor(props) {
      super(props);
      this.state = transform(store.getState());
      this.handleStoreChange = this.handleStoreChange.bind(this);
    }

    componentDidMount() {
      this.eventSubscription = store.addListener(this.handleStoreChange);
    }

    componentWillUnmount() {
      if (this.eventSubscription && typeof this.eventSubscription === 'function') {
        this.eventSubscription.remove();
      } else {
        console.log('eventSubscription is unexpected type.');
      }
    }

    handleStoreChange() {
      if (store && typeof store.getState === 'function') {
        this.setState(transform(store.getState()));
      }
    }

    render() {
      return _react2.default.createElement(ComposedComponent, _extends({}, this.props, this.state));
    }
  };
}
