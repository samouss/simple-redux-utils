"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var asyncActionWith = exports.asyncActionWith = function asyncActionWith(fn) {
  for (var _len = arguments.length, actions = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    actions[_key - 1] = arguments[_key];
  }

  return function () {
    for (var _len2 = arguments.length, params = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      params[_key2] = arguments[_key2];
    }

    return function (dispatch) {
      var request = actions[0],
          success = actions[1],
          failure = actions[2];


      dispatch(request.apply(undefined, params));

      return fn.apply(undefined, params).then(function (res) {
        dispatch(success(res));

        return res;
      }).catch(function (err) {
        dispatch(failure(err));

        throw err;
      });
    };
  };
};