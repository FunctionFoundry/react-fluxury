'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.connectStore = connectStore;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function connectStore(store, ComposedComponent) {
  var transform = arguments.length <= 2 || arguments[2] === undefined ? function (d) {
    return d;
  } : arguments[2];

  return function (_React$Component) {
    _inherits(ConnectToStore, _React$Component);

    function ConnectToStore(props) {
      _classCallCheck(this, ConnectToStore);

      var _this = _possibleConstructorReturn(this, (ConnectToStore.__proto__ || Object.getPrototypeOf(ConnectToStore)).call(this, props));

      _this.state = transform(store.getState());
      _this.handleStoreChange = _this.handleStoreChange.bind(_this);
      return _this;
    }

    _createClass(ConnectToStore, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.unsubscribe = store.subscribe(this.handleStoreChange);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        if (typeof this.unsubscribe === 'function') {
          this.unsubscribe();
        }
      }
    }, {
      key: 'handleStoreChange',
      value: function handleStoreChange() {
        if (store && typeof store.getState === 'function') {
          this.setState(transform(store.getState()));
        }
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(ComposedComponent, _extends({}, this.props, this.state));
      }
    }]);

    return ConnectToStore;
  }(_react2.default.Component);
}
