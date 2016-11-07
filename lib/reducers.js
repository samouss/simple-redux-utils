"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var createReducer = exports.createReducer = function createReducer(initialState, handlers) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    if (!{}.hasOwnProperty.call(handlers, action.type)) {
      return state;
    }

    return handlers[action.type](state, action);
  };
};