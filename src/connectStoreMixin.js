/* Mixin generator for fluxury store.
 * Author: Peter Moresi
 * Date: 2/29/2016
 */
export function connectToStoreMixin(store, getState) {
  return {
    componentDidMount() {
      this.__eventSubscription = store.addListener( this.__handleStoreChange )
    },

    componentWillUnmount() {
      if (this.__eventSubscription && typeof this.__eventSubscription === 'function') {
        this.__eventSubscription.remove()
      } else {
        console.log( '__eventSubscription is unexpected type.' )
      }
    },

    __handleStoreChange() {
      if (store && typeof store.getState === 'function') {
        this.setState(
          getState(
            store.getState()
          )
        )
      }
    }
  }
}
