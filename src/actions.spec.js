import { describe, it } from 'mocha';
import { should } from 'chai';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as actions from './actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const Should = should();

describe('actions', () => {
  /**
   * asyncActionWith
   */
  describe('asyncActionWith', () => {
    it('should successfully resolve the action', () => {
      const store = mockStore();

      const value = 5;
      const fn = value => Promise.resolve(value);
      const request = () => ({ type: 'REQUEST' });
      const success = () => ({ type: 'SUCCESS' });
      const failure = () => ({ type: 'FAILURE' });

      const expectation = [
        { type: 'REQUEST' },
        { type: 'SUCCESS' },
      ];

      const action = actions.asyncActionWith(fn, request, success, failure);

      return store.dispatch(action(value)).then(() => {
        store.getActions().should.be.deep.equal(expectation);
      });
    });

    it('should failed to resolve the action', () => {
      const store = mockStore();

      const value = 5;
      const fn = value => Promise.reject(value);
      const request = () => ({ type: 'REQUEST' });
      const success = () => ({ type: 'SUCCESS' });
      const failure = () => ({ type: 'FAILURE' });

      const expectation = [
        { type: 'REQUEST' },
        { type: 'FAILURE' },
      ];

      const action = actions.asyncActionWith(fn, request, success, failure);

      return store.dispatch(action(value)).catch(() => {
        store.getActions().should.be.deep.equal(expectation);
      });
    });
  });

  /**
   * getPromiseResolverBoundToPromise
   */
  describe('getPromiseResolverBoundToPromise', () => {
    it('should return the resolver', () => {
      const resolver = {
        resolve: () => {},
        reject: () => {},
      };

      const action = {
        'simple-redux-utils/KEY_BINDING_PROMISE': resolver,
      };

      const result = actions.getPromiseResolverBoundToPromise(action);

      result.should.be.deep.equal(resolver);
    });

    it('should not return the resolver', () => {
      const action = {};

      const result = actions.getPromiseResolverBoundToPromise(action);

      Should.not.exist(result);
    });
  });

  /**
   * bindActionToPromise
   */
  describe('bindActionToPromise', () => {
    const middleware = () => next => action => {
      const resolver = actions.getPromiseResolverBoundToPromise(action);

      if (!resolver) {
        return next(action);
      }

      if (action.payload) {
        return resolver.resolve(next(action));
      }

      return resolver.reject(next(action));
    };

    const middlewares = [thunk, middleware];
    const mockStore = configureMockStore(middlewares);

    it('should bind an action to a promise and resolve it', () => {
      const store = mockStore();

      const action = {
        type: 'ACTION',
      };

      const actionCreator = payload => ({
        ...action,
        payload,
      });

      const boundAction = actions.bindActionToPromise(actionCreator);

      return store.dispatch(boundAction(true)).then(res => {
        res.type.should.be.equal(action.type);
      });
    });

    it('should bind an action to a promise and reject it', () => {
      const store = mockStore();

      const action = {
        type: 'ACTION',
      };

      const actionCreator = payload => ({
        ...action,
        payload,
      });

      const boundAction = actions.bindActionToPromise(actionCreator);

      return store.dispatch(boundAction(false)).catch(res => {
        res.type.should.be.equal(action.type);
      });
    });
  });
});
