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

## Run the test

```
npm test
```
