/* eslint-disable max-len, padded-blocks */

import { describe, it } from 'mocha';
import { should } from 'chai';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as actions from './actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

should();

describe('actions', () => {

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

});
