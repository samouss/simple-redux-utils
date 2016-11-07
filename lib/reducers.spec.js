'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* eslint-disable max-len, padded-blocks */

var _mocha = require('mocha');

var _chai = require('chai');

var _reducers = require('./reducers');

(0, _chai.should)();

(0, _mocha.describe)('reducers', function () {

  (0, _mocha.describe)('createReducer', function () {
    (0, _mocha.it)('should create reducer and return default state if no action match (no action)', function () {
      var initialState = { value: 10 };
      var action = {};
      var reducer = (0, _reducers.createReducer)(initialState, {});

      var expect = { value: 10 };
      var result = reducer(undefined, action);

      result.should.be.deep.equal(expect);
    });

    (0, _mocha.it)('should create reducer and return default state if no action match (N actions)', function () {
      var initialState = { value: 10 };
      var action = {};
      var reducer = (0, _reducers.createReducer)(initialState, {
        ACTION_0: function ACTION_0(state) {
          return state;
        },
        ACTION_1: function ACTION_1(state) {
          return state;
        },
        ACTION_2: function ACTION_2(state) {
          return state;
        }
      });

      var expect = { value: 10 };
      var result = reducer(undefined, action);

      result.should.be.deep.equal(expect);
    });

    (0, _mocha.it)('should create reducer and return default state if no state is passed', function () {
      var initialState = { value: 10 };
      var action = { type: 'ACTION_0' };
      var reducer = (0, _reducers.createReducer)(initialState, {
        ACTION_0: function ACTION_0(state) {
          return state;
        },
        ACTION_1: function ACTION_1(state) {
          return state;
        },
        ACTION_2: function ACTION_2(state) {
          return state;
        }
      });

      var expect = { value: 10 };
      var result = reducer(undefined, action);

      result.should.be.deep.equal(expect);
    });

    (0, _mocha.it)('should create reducer and return new state from inital state', function () {
      var initialState = { value: 10 };
      var action = { type: 'ACTION_0' };
      var reducer = (0, _reducers.createReducer)(initialState, {
        ACTION_0: function ACTION_0(state) {
          return _extends({}, state, { value: state.value + 10 });
        },
        ACTION_1: function ACTION_1(state) {
          return state;
        },
        ACTION_2: function ACTION_2(state) {
          return state;
        }
      });

      var expect = { value: 20 };
      var result = reducer(undefined, action);

      result.should.be.deep.equal(expect);
    });

    (0, _mocha.it)('should create reducer and return new state based on previous one', function () {
      var initialState = { value: 10 };
      var prevState = { value: 30 };
      var action = { type: 'ACTION_0' };
      var reducer = (0, _reducers.createReducer)(initialState, {
        ACTION_0: function ACTION_0(state) {
          return _extends({}, state, { value: state.value + 10 });
        },
        ACTION_1: function ACTION_1(state) {
          return state;
        },
        ACTION_2: function ACTION_2(state) {
          return state;
        }
      });

      var expect = { value: 40 };
      var result = reducer(prevState, action);

      result.should.be.deep.equal(expect);
    });
  });
});