// Similar to connect in react-redux
import { Component } from 'react'

export function connect(selector) {
  // return a new function that returns a new React class that calls the renderFunc
  return function(renderFunc) {

    return class extends Component {

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

      render() {
        return renderFunc(selector(this.state))
      }
    }
  }
}
