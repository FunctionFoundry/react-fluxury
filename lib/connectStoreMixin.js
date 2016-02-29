/* Mixin generator for fluxury store.
 * Author: Peter Moresi
 * Date: 2/29/2016
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.connectStoreMixin = connectStoreMixin;

function connectStoreMixin(store, func) {
  return {
    getInitialState: function getInitialState() {

      return func(store.getState());
    },

    componentDidMount: function componentDidMount() {
      this.__eventSubscription = store.addListener(this.__handleStoreChange);
    },

    componentWillUnmount: function componentWillUnmount() {
      if (this.__eventSubscription && typeof this.__eventSubscription === 'function') {
        this.__eventSubscription.remove();
      } else {
        console.log('__eventSubscription is unexpected type.');
      }
    },

    __handleStoreChange: function __handleStoreChange() {
      if (store && typeof store.getState === 'function') {
        this.setState(func(store.getState()));
      }
    }
  };
}
