/* Mixin generator for fluxury store.
 * Author: Peter Moresi
 * Date: 2/29/2016
 */

export function connectStoreMixin(store, func) {
  return {
    getInitialState() {

      return func(
        store.getState()
      )

    },

    componentDidMount() {
      this.unsubscribe = store.subscribe( this.__handleStoreChange )
    },

    componentWillUnmount() {
      if (typeof this.unsubscribe === 'function') {
        this.unsubscribe()
      }
    },

    __handleStoreChange() {
      if (store && typeof store.getState === 'function') {
        this.setState(
          func(
            store.getState()
          )
        )
      }
    }
  }
}
