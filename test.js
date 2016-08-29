var test = require('tape');
var {createClass, connectStore} = require('./lib/index')
var {createStore} = require('fluxury')
var React = require('react')
var ReactDom = require('react-dom/server')

test('api tests', function(t) {
  t.plan(2);

  t.equals(typeof createClass, 'function' );
  t.equals(typeof connectStore, 'function' );
});

var CounterStore = createStore({
  getInitialState: () => ({ count: 0 }),
  increment: (state) => ({ count: state.count + 1 }),
});

test('createClass works as expected', function(t) {
  t.plan(2)

  var CounterView = createClass(CounterStore)(({count}) => (
    <div>{count}</div>
  ))

  var str = ReactDom.renderToStaticMarkup(<CounterView />)
  t.equals(str, '<div>0</div>')

  CounterView = createClass(CounterStore, s => ({ num: s.count }))(({num}) => (
    <div>{num}</div>
  ))

  str = ReactDom.renderToStaticMarkup(<CounterView />)
  t.equals(str, '<div>0</div>')

})

test('connectStore works as expected', function(t) {
  t.plan(2)

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

})
