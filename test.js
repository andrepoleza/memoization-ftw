var test = require('ava');
var memoizationFtw = require('./');

test('addition', function(t) {
  var memoized = memoizationFtw(function(left, right) {
    return left + right;
  });

  var first = memoized(1, 1);
  var second = memoized(2, 2);
  var third = memoized(3, 3);

  t.truthy(memoized.cache);

  t.is(first, 2);
  t.is(second, 4);
  t.is(third, 6);
  t.is(memoized.cache['1,1'], first);
  t.is(memoized.cache['2,2'], second);
  t.is(memoized.cache['3,3'], third);
});

test('subtraction', function(t) {
  var memoized = memoizationFtw(function(left, right) {
    return left - right;
  });

  var first = memoized(10, 5);
  var second = memoized(1, 1);
  var third = memoized(100, 25);

  t.truthy(memoized.cache);

  t.is(first, 5);
  t.is(second, 0);
  t.is(third, 75);
  t.is(memoized.cache['10,5'], first);
  t.is(memoized.cache['1,1'], second);
  t.is(memoized.cache['100,25'], third);
});

test('isPerfectNumber', function(t) {
  var isPerfectNumber = require('is-perfect-number');

  var memoized = memoizationFtw(isPerfectNumber);

  var first = memoized(1);
  var second = memoized(2);
  var third = memoized(3);
  var fourth = memoized(6);
  var fifth = memoized(28);
  var sixth = memoized(496);

  t.truthy(memoized.cache);

  t.falsy(first);
  t.falsy(second);
  t.falsy(third);
  t.truthy(fourth);
  t.truthy(fifth);
  t.truthy(sixth);
  t.is(memoized.cache['1'], first);
  t.is(memoized.cache['2'], second);
  t.is(memoized.cache['3'], third);
  t.is(memoized.cache['6'], fourth);
  t.is(memoized.cache['28'], fifth);
  t.is(memoized.cache['496'], sixth);
});
