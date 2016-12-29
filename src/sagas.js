import { call } from 'redux-saga/effects';
import { getPromiseResolverBoundToPromise } from './actions';

export const throws = error => {
  throw error;
};

export const wrapSagaWithResolver = function* wrapSagaWithResolver(saga, action) {
  const resolver = getPromiseResolverBoundToPromise(action);

  try {
    const response = yield call(saga, action);

    yield call(resolver.resolve, response);
  } catch (error) {
    yield call(resolver.reject, error);
  }
};
