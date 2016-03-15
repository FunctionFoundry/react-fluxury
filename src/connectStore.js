import React from 'react';

export function connectStore (store, ComposedComponent, transform) {
  return (
    class ConnectToStore extends React.Component {

      constructor(props) {
        super(props)
        this.state = transform( store.getState() )
        this.handleStoreChange = this.handleStoreChange.bind(this)
      }

      componentDidMount() {
        this.eventSubscription = store.addListener( this.handleStoreChange )
      }

      componentWillUnmount() {
        if (this.eventSubscription && typeof this.eventSubscription === 'function') {
          this.eventSubscription.remove()
        } else {
          console.log( 'eventSubscription is unexpected type.' )
        }
      }

      handleStoreChange() {
        if (store && typeof store.getState === 'function') {
          this.setState(
            transform( store.getState() )
          )
        }
      }

      render() {
        return (<ComposedComponent {...this.props} {...this.state} />);
      }
    }
  )
}
