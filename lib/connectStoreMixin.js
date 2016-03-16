'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectStoreMixin = connectStoreMixin;
/* Mixin generator for fluxury store.
 * Author: Peter Moresi
 * Date: 2/29/2016
 */

function connectStoreMixin(store, func) {
  return {
    getInitialState: function getInitialState() {

      return func(store.getState());
    },
    componentDidMount: function componentDidMount() {
      this.unsubscribe = store.subscribe(this.__handleStoreChange);
    },
    componentWillUnmount: function componentWillUnmount() {
      if (typeof this.unsubscribe === 'function') {
        this.unsubscribe();
      }
    },
    __handleStoreChange: function __handleStoreChange() {
      if (store && typeof store.getState === 'function') {
        this.setState(func(store.getState()));
      }
    }
  };
}
