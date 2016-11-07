/* eslint-disable max-len, padded-blocks */

import { describe, it } from 'mocha';
import { should } from 'chai';
import { createReducer } from './reducers';

should();

describe('reducers', () => {

  describe('createReducer', () => {
    it('should create reducer and return default state if no action match (no action)', () => {
      const initialState = { value: 10 };
      const action = {};
      const reducer = createReducer(initialState, {});

      const expect = { value: 10 };
      const result = reducer(undefined, action);

      result.should.be.deep.equal(expect);
    });

    it('should create reducer and return default state if no action match (N actions)', () => {
      const initialState = { value: 10 };
      const action = {};
      const reducer = createReducer(initialState, {
        ACTION_0: state => state,
        ACTION_1: state => state,
        ACTION_2: state => state,
      });

      const expect = { value: 10 };
      const result = reducer(undefined, action);

      result.should.be.deep.equal(expect);
    });

    it('should create reducer and return default state if no state is passed', () => {
      const initialState = { value: 10 };
      const action = { type: 'ACTION_0' };
      const reducer = createReducer(initialState, {
        ACTION_0: state => state,
        ACTION_1: state => state,
        ACTION_2: state => state,
      });

      const expect = { value: 10 };
      const result = reducer(undefined, action);

      result.should.be.deep.equal(expect);
    });

    it('should create reducer and return new state from inital state', () => {
      const initialState = { value: 10 };
      const action = { type: 'ACTION_0' };
      const reducer = createReducer(initialState, {
        ACTION_0: state => ({ ...state, value: state.value + 10 }),
        ACTION_1: state => state,
        ACTION_2: state => state,
      });

      const expect = { value: 20 };
      const result = reducer(undefined, action);

      result.should.be.deep.equal(expect);
    });

    it('should create reducer and return new state based on previous one', () => {
      const initialState = { value: 10 };
      const prevState = { value: 30 };
      const action = { type: 'ACTION_0' };
      const reducer = createReducer(initialState, {
        ACTION_0: state => ({ ...state, value: state.value + 10 }),
        ACTION_1: state => state,
        ACTION_2: state => state,
      });

      const expect = { value: 40 };
      const result = reducer(prevState, action);

      result.should.be.deep.equal(expect);
    });
  });

});
