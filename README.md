# react-pure-flux

[![CircleCI](https://circleci.com/gh/WebsiteHQ/react-pure-flux.svg?style=svg)](https://circleci.com/gh/WebsiteHQ/react-pure-flux)

Bind pure-flux stores to React.js.

## quick start

```sh
npm install --save react-pure-flux
```

```js
import {connectStore} from 'react-pure-flux'
```

## connectStore

Wrap any component with a connect component.

```js
var Component = require('react').Component;
var {createStore, dispatch} = require('pure-flux');
var {connectStore} = require('react-pure-flux');

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
