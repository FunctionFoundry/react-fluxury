# react-fluxury

[![Circle CI](https://circleci.com/gh/websitehq/react-fluxury/tree/master.svg?style=svg)](https://circleci.com/gh/websitehq/react-fluxury/tree/master)

Bind fluxury stores to React.js.

## quick start

```sh
npm install --save react-fluxury
```

```js
import {createClass, connectStore} from 'react-fluxury'
```
## connect

Returns a function that generates a React component that runs your render function.

connect(store, transform)(renderFunc)

```js
import {createStore} from 'fluxury'
import {createClass} from 'react-fluxury'

var CounterStore = createStore({
  getInitialState: () => ({ count: 0 }),
  increment: (state) => ({ count: state.count + 1 }),
});

var CounterView = createClass(
  CounterStore,
)(({count}) => (
  <div>{count}</div>
))
```

## higher-order component

Higher order functions are so cool and are compatible with ES6 classes.

In this case state is passed down as props to the wrapped component.

```js
var Component = require('react').Component;
var {createStore, dispatch} = require('fluxury');
var {connectStore} = require('react-fluxury');

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
