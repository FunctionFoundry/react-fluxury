'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.connect = connect;

var _react = require('react');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Similar to connect in react-redux


function connect(store, transform) {
  // return a new function that returns a new React class that calls the renderFunc
  return function (renderFunc) {

    return function (_Component) {
      _inherits(Connect, _Component);

      function Connect(props) {
        _classCallCheck(this, Connect);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Connect).call(this, props));

        _this.state = transform(store.getState());
        _this.handleStoreChange = _this.handleStoreChange.bind(_this);
        return _this;
      }

      _createClass(Connect, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
          this.token = store.subscribe(this.handleStoreChange);
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          this.token.remove();
        }
      }, {
        key: 'handleStoreChange',
        value: function handleStoreChange() {
          this.setState(transform(store.getState()));
        }
      }, {
        key: 'render',
        value: function render() {
          return renderFunc(this.state);
        }
      }]);

      return Connect;
    }(_react.Component);
  };
}
