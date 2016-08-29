import React from 'react';

export function connectStore (store, ComposedComponent, transform=d => d) {
  return (
    class ConnectToStore extends React.Component {

      constructor(props) {
        super(props)
        this.state = transform( store.getState() )
        this.handleStoreChange = this.handleStoreChange.bind(this)
      }

      componentDidMount() {
        this.unsubscribe = store.subscribe( this.handleStoreChange )
      }

      componentWillUnmount() {
        if (typeof this.unsubscribe === 'function') {
          this.unsubscribe()
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
