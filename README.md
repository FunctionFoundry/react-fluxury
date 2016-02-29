# react-fluxury

STATUS: Planned

Connect your fluxury store's state to React.js component state.

## chain reactions

Flux and React.js thrive on chain reactions. An action results in
new state and that new state needs to propagate into the component.

Finally, the component needs to redraw itself when updates occurs. Fortunately,
React.js makes this process less painful and automates away the complexity.

However, when connecting Fluxury stores to components you add needless boilerplate
code to your project.

## boilerplate

This is how to connect fluxury stores without react-fluxury binding.

```js
var React = require('react');
var {createStore} = require('fluxury');

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
    countStore.INC())
  },

  handleDownClick: function() {
    /* Call dispatch to submit the action to the stores */
    countStore.DEC()
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

## mixins

Love or hate mixins, this is how to connect fluxury stores for mixin fanboys.

```js
var React = require('react');
var {createStore} = require('fluxury');
var {connectStoreMixin} = require('react-fluxury').connectStoreMixin;

var countStore = createStore('CountStore', 0, {
  increment: (state) => state + 1,
  decrement: (state) => state - 1
});

var MyComponent = React.createClass({

  mixins: [connectStoreMixin(state => ({
    count: state
  })]

  handleUpClick: function() {
    /* Call dispatch to submit the action to the stores */
    countStore.INC())
  },

  handleDownClick: function() {
    /* Call dispatch to submit the action to the stores */
    countStore.DEC()
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

MyComponent = connectStore(MyComponent, (state) => {
  count: state
})
```

## higher-order component

```js
var React = require('react');
var {createStore} = require('fluxury');
var {connectStore} = require('react-fluxury');

var countStore = createStore('CountStore', 0, {
  increment: (state) => state + 1,
  decrement: (state) => state - 1
});

var MyComponent = React.createClass({

  handleUpClick: function() {
    /* Call dispatch to submit the action to the stores */
    countStore.INC())
  },

  handleDownClick: function() {
    /* Call dispatch to submit the action to the stores */
    countStore.DEC()
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

MyComponent = connectStore(MyComponent, (state) => {
  count: state
})
```
