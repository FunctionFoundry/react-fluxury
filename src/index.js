import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export function connectStore (store, Composed, transform=d=>d) {
  return (
    class Connect extends React.Component {

      constructor(props) {
        super(props)
        this.state = transform( store.getState() ) || {}
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
        this.handleChange = this.handleChange.bind(this)
      }

      componentDidMount() {
        this.token = store.subscribe( this.handleChange )
      }

      componentWillUnmount() {
        if (typeof this.token === 'function') {
          this.token()
        }
      }

      handleChange(state) {
        this.setState(
          transform( state )
        )
      }

      render() {
        return (<Composed {...this.state} {...this.props} />);
      }
    }
  )
}
