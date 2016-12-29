# Simple redux utils

[![npm version](https://badge.fury.io/js/simple-redux-utils.svg)](https://badge.fury.io/js/simple-redux-utils) [![Build Status](https://travis-ci.org/samouss/simple-redux-utils.svg?branch=master)](https://travis-ci.org/samouss/simple-redux-utils)

## Installation

```
npm install --save simple-redux-utils
```

## Usage

Import the module in your application:

```js
// From ES6
import * as reduxUtils from 'simple-redux-utils'
import { createReducer } from 'simple-redux-utils';

// From CJS
const reduxUtils = require('simple-redux-utils');

// From global
const reduxUtils = simpleReduxUtils.default;
```

## Documentation

### Reducers

#### # **createReducer(initialState, handler)**

```js
const reducer = createReducer({}, {
  ['ACTION']: (state, action) => state,
});
```

Return the initialState if no action match.

##### **initialState**

Type: `any`

##### **handler**

Type: `{ actionType: (previousState, action) => nextState }` | default: `{}`

### Actions

#### # **asyncActionWith(fn, ...actions)(...params)(dispatch)**

```js
const fn = (...params) =>
  Promise.resolve(params);

const request = payload => ({
  type: 'REQUEST',
  payload,
});

const success = payload => ({
  type: 'SUCCESS',
  payload,
});

const failure = payload => ({
  type: 'FAILURE',
  payload,
});

export const action = id =>
  asyncActionWith(
    fn,
    request,
    success,
    failure,
  )(id);

dispatch(action(id));

```

##### **fn**

Type: `(...params: Array<any>): Promise<any>`

The function to execute in the action creator.

##### **actions**

Type: `Array<(payload: any) => ACTION>`

Array of 3 action creators (REQUEST, SUCCESS, FAILURE).

##### **params**

Type: `any`

Parameters for the function (will be dispatch in REQUEST action).

##### **dispatch**

Type: `(ACTION) => any`

Redux dipatch function.

#### # **bindActionToPromise(actionCreator)(dispatch)**

```js
const actionCreator = payload => ({
  type: 'ACTION',
  payload,
})

const boundAction = bindActionToPromise(actionCreator);

dispatch(boundAction(payload));

// Usage with Redux Saga
function* saga() {
  const action = take('ACTION');
  const resolver = getResolverBindActionToPromise(action);

  try {
    yield call(fn, value);
    yield put(actionCreator());

    resolver.resolve();
  } catch(error) {
    resolver.reject(error);
  }
}
```

##### **actionCreator**

Type: `(payload: any) => ACTION`

##### **payload**

Type: `any`

##### **dispatch**

Type: `(ACTION) => any`

Redux dipatch function.

#### # **getPromiseResolverBoundToPromise(action)**

```js
const resolver = getPromiseResolverBoundToPromise(action);

resolver.resolve();
resolver.reject();
```

##### **action**

Type: `ACTION`

### Sagas

#### # **throws(error)**

```js
const saga = function* saga() {
  yield put(request());

  try {
    const response = yield call(fetch);

    yield put(success(response));
    yield response;
  } catch (error) {
    // We can handle error at this level
    yield put(failure(error));
    yield call(throws, error);
  }
}

const main = function* main() {
  try {
    yield call(saga);
    yield call(otherSagaWhoCanDispatchActionLikePrevious);
    yield put(success());
  } catch (error) {
    // Or at this one
    // Useful for dispatch different action
    yield put(failure(error));
  }
}
```

##### **error**

Type: `{ [KEY: any]: any }`

#### # **wrapSagaWithResolver(saga, action)**

```js
export const watch = function* watch() {
  while (true) {
    const action = yield take(ACTION);

    yield fork(wrapSagaWithResolver, saga, action);
  }
};

const boundAction = bindActionToPromise(actionCreator);

dispatch(boundAction(payload)).then(() => {
  // Enable the possibility to call `.then` on dispatch when action creator
  // has been bound to promise with `bindActionToPromise`
})
```

##### **saga**

Type: `function* () => any`

##### **action**

Type: `ACTION`

**MUST** have been bound to promise with `bindActionToPromise`.

## Run the test

```
npm test
```
