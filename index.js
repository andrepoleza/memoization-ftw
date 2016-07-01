module.exports = function memoizationFtw(functionToBeMemoized) {
  var cache = {};

  var memoizedFunction = function() {
    var args = [].slice.call(arguments);
    if (cache[args]) {
      return cache[args];
    } else {
      var result = functionToBeMemoized.apply(this, args);
      cache[args] = result;
      return result;
    }
  };
  memoizedFunction.cache = cache;
  return memoizedFunction;
};
