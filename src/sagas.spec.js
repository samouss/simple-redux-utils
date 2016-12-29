import { describe, it } from 'mocha';
import { should } from 'chai';
import { call } from 'redux-saga/effects';
import * as sagas from './sagas';

const s = should();

describe('sagas', () => {
  /**
   * throws
   */
  describe('throws', () => {
    it('should throw an error with given object', () => {
      const error = {
        error: true,
      };

      s.throw(() => sagas.throws(error));
    });
  });

  /**
   * wrapSagaWithResolver
   */
  describe('wrapSagaWithResolver', () => {
    const KEY_BINDING_PROMISE = 'simple-redux-utils/KEY_BINDING_PROMISE';

    it('should resolve promise when saga is successfully execute', () => {
      const saga = () => {};
      const response = 'RESPONSE';
      const action = {
        [KEY_BINDING_PROMISE]: {
          resolve: () => {},
          reject: () => {},
        },
      };

      const expectation = [
        call(saga, action),
        call(action[KEY_BINDING_PROMISE].resolve, response),
        true,
      ];

      const iterator = sagas.wrapSagaWithResolver(saga, action);
      const result = [
        iterator.next().value,
        iterator.next(response).value,
        iterator.next().done,
      ];

      result.should.be.deep.equal(expectation);
    });

    it('should reject promise when saga throw an error', () => {
      const saga = () => {};
      const error = 'ERROR';
      const action = {
        [KEY_BINDING_PROMISE]: {
          resolve: () => {},
          reject: () => {},
        },
      };

      const expectation = [
        call(saga, action),
        call(action[KEY_BINDING_PROMISE].reject, error),
        true,
      ];

      const iterator = sagas.wrapSagaWithResolver(saga, action);
      const result = [
        iterator.next().value,
        iterator.throw(error).value,
        iterator.next().done,
      ];

      result.should.be.deep.equal(expectation);
    });
  });
});
