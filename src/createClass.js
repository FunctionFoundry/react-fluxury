import React from 'react';

export function createClass(store, transform=(d) => d) {
  // return a new function that returns a new React class that calls the renderFunc
  return function(renderFunc) {
    return React.createClass({
      getInitialState() {
        return transform(store.getState());
      },
      componentDidMount() {
        this.unsubscribe = store.subscribe( this.handleStoreChange )
      },
      componentWillUnmount() {
        if (typeof this.unsubscribe === 'function') {
          this.unsubscribe()
        }
      },
      handleStoreChange() {
        if (store && typeof store.getState === 'function') {
          this.setState( transform(store.getState()) )
        }
      },
      render() {
        return renderFunc( this.state )
      }
    })
  }
}
