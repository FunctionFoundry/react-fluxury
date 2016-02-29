var test = require('tape');
var rf = require('./lib/index')

test('api tests', function(t) {
  t.plan(3);

  t.equals(typeof rf, 'object' );
  t.equals(typeof rf.connectStore, 'function' );
  t.equals(typeof rf.connectStoreMixin, 'function' );

});
