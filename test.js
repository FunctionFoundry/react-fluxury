var test = require('tape');
var rf = require('./lib/index')

test('api tests', function(t) {
  t.plan(3);

  t.equals(typeof rf, 'object' );
  t.equals(typeof rf.connect, 'function' );
  t.equals(typeof rf.connectStore, 'function' );
  t.equals(typeof rf.connectStoreMixin, 'function' );

});

test('connect works as expected', function(t) {
  t.plan(1)

  t.ok(false) // figure out how to test this
})

test('connectStore works as expected', function(t) {
  t.plan(1)

  t.ok(false) // figure out how to test this
})

test('connectStoreMixin works as expected', function(t) {
  t.plan(1)

  t.ok(false) // figure out how to test this
})
