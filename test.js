var test = require('tape');
var {createClass, connectStore} = require('./lib/index')
var {createStore, dispatch} = require('pure-flux')
var React = require('react')
var ReactDom = require('react-dom/server')

test('api tests', function(t) {
  t.plan(1);

  t.equals(typeof connectStore, 'function' );
});

var CounterStore = createStore("CounterStore", (state={ count: 0 }, action) => {
  switch (action.type) {
    case 'increment':
    return { count: state.count+1 };
    default:
    return state;
  }
});

test('connectStore works as expected', function(t) {
  t.plan(3)

  var CounterView = React.createClass({
    render() {
      return <div>{this.props.foo} - {this.props.count}</div>
    }
  })

  var EnhancedCounterView = connectStore(CounterStore, CounterView)


  var str = ReactDom.renderToStaticMarkup(<EnhancedCounterView foo="bar" />)
  t.equals(str, '<div>bar - 0</div>')

  CounterView = React.createClass({
    render() {
      return <div>{this.props.foo} - {this.props.num}</div>
    }
  })

  EnhancedCounterView = connectStore(CounterStore, CounterView, d => ({ num: d.count }))

  var str = ReactDom.renderToStaticMarkup(<EnhancedCounterView foo="bar" />)
  t.equals(str, '<div>bar - 0</div>')

  dispatch('increment')

  var str = ReactDom.renderToStaticMarkup(<EnhancedCounterView foo="bar" />)
  t.equals(str, '<div>bar - 1</div>')

})
