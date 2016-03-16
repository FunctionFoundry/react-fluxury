# react-fluxury

Connect a Fluxury store to React.js component state.

## quick start

```sh
npm install --save react-fluxury
```

```js
import {connect, connectStore, connectStoreMixin} from 'react-fluxury'
```
## connect

Returns a function that generates a React component that runs your render function.

connect(store, selector)(renderFunc)

```js
import {createStore} from 'fluxury'
import {connect} from 'react-fluxury'

var CounterStore = createStore(
  'Counter Store',
  0,
  {
    increment: (state) => state+1
  }
)

function MyPage({number}) {
  return <div>{number}</div>
}

export default connect(
  CounterStore,
  state => { number: state }
)(MyPage)
```

## mixins

Love or hate mixins, this is how to connect fluxury stores for mixin fanboys like myself.

```js
var React = require('react');
var {createStore, dispatch} = require('fluxury');
var {connectStoreMixin} = require('react-fluxury').connectStoreMixin;

var countStore = createStore('CountStore', 0, {
  increment: (state) => state + 1,
  decrement: (state) => state - 1
});

var MyComponent = React.createClass({

  mixins: [connectStoreMixin(countStore, state => ({
    count: state
  })]

  handleUpClick() {
    dispatch('increment')
  },

  handleDownClick() {
    dispatch('decrement')
  },

  render: function() {
    return (
      <div>
        <p>{this.state.count}</p>
        <button onClick={this.handleUpClick}>+1</button>
        <button onClick={this.handleDownClick}>-1</button>
      </div>
    );
  }

});
```

## higher-order component

Higher order functions are so cool and are compatible with ES6 classes.

In this case state is passed down as props to the wrapped component.

```js
var Component = require('react').Component;
var {createStore, dispatch} = require('fluxury');
var {connectStore} = require('react-fluxury');

var countStore = createStore('CountStore', 0, {
  increment: (state) => state + 1,
  decrement: (state) => state - 1
});

class MyComponent extends Component {

  handleUpClick() {
    dispatch('increment')
  }

  handleDownClick() {
    dispatch('decrement')
  }

  render() {
    return (
      <div>
        <p>{this.props.count}</p>
        <button onClick={this.handleUpClick}>+1</button>
        <button onClick={this.handleDownClick}>-1</button>
      </div>
    );
  }

});

EnhancedComponent = connectStore(countStore, MyComponent, (state) => {
  count: state
})
```

## boilerplate without react-fluxury

This is how to connect fluxury stores without react-fluxury.

```js
var React = require('react');
var {createStore, dispatch} = require('fluxury');

var countStore = createStore('CountStore', 0, {
  increment: (state) => state + 1,
  decrement: (state) => state - 1
});

var MyComponent = React.createClass({

  componentDidMount: function() {
    this.token = countStore.addListener( this.handleStoreChange );
  },

  componentWillUnmount: function() {
    this.token.remove();
  },

  handleStoreChange: function() {
    this.setState({ count: countStore.getState() })
  },

  handleUpClick: function() {
    /* Call dispatch to submit the action to the stores */
    dispatch('increment')
  },

  handleDownClick: function() {
    /* Call dispatch to submit the action to the stores */
    dispatch('decrement')
  },

  render: function() {
    return (
      <div>
        <p>{this.state.count}</p>
        <button onClick={this.handleUpClick}>+1</button>
        <button onClick={this.handleDownClick}>-1</button>
      </div>
    );
  }

});
```
