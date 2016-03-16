// Similar to connect in react-redux
import { Component } from 'react'

export function connect(store, transform) {
  // return a new function that returns a new React class that calls the renderFunc
  return function(renderFunc) {

    return class Connect extends Component {

      constructor(props) {
        super(props)
        this.state = transform( store.getState() )
        this.handleStoreChange = this.handleStoreChange.bind(this)
      }

      componentDidMount() {
        this.token = store.addListener( this.handleStoreChange )
      }

      componentWillUnmount() {
        this.token.remove()
      }

      handleStoreChange() {
        this.setState(
          transform( store.getState() )
        )
      }

      render() {
        return renderFunc(this.state)
      }
    }
  }
}
