'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connect = connect;

var _react = require('react');

function connect(store, transform) {
  // return a new function that returns a new React class that calls the renderFunc
  return function (renderFunc) {

    return class extends _react.Component {

      constructor(props) {
        super(props);
        this.state = transform(store.getState());
        this.handleStoreChange = this.handleStoreChange.bind(this);
      }

      componentDidMount() {
        this.token = store.addListener(this.handleStoreChange);
      }

      componentWillUnmount() {
        this.token.remove();
      }

      handleStoreChange() {
        this.setState(transform(store.getState()));
      }

      render() {
        return renderFunc(transform(this.state));
      }
    };
  };
} // Similar to connect in react-redux
