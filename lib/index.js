'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _connect = require('./connect');

var _connectStore = require('./connectStore');

var _connectStoreMixin = require('./connectStoreMixin');

exports.default = {
  connect: _connect.connect,
  connectStore: _connectStore.connectStore,
  connectStoreMixin: _connectStoreMixin.connectStoreMixin
};
