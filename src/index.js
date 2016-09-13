import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';

export function connectStore (store, Composed, transform=d=>d) {
  return (
    class Connect extends React.Component {

      constructor(props) {
        super(props)
        this.state = transform( store.getState() ) || {}
        this.handleChange = this.handleChange.bind(this)
      }

      // Speed up render on pure stores
      // https://facebook.github.io/react/docs/shallow-compare.html
      shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
      }

      componentDidMount() {
        this.token = store.subscribe( this.handleChange )
      }

      componentWillUnmount() {
        if (typeof this.token === 'function') {
          this.token()
        }
      }

      handleChange() {
        if (store && typeof store.getState === 'function') {
          this.setState(
            transform( store.getState() )
          )
        }
      }

      render() {
        return (<Composed {...this.props} {...this.state} />);
      }
    }
  )
}
