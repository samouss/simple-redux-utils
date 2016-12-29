export const asyncActionWith = (fn, ...actions) => (...params) => dispatch => {
  const [request, success, failure] = actions;

  dispatch(request(...params));

  return fn(...params).then(res => {
    dispatch(success(res));

    return res;
  }).catch(err => {
    dispatch(failure(err));

    throw err;
  });
};

const KEY_BINDING_PROMISE = 'simple-redux-utils/KEY_BINDING_PROMISE';

export const getPromiseResolverBoundToPromise = action =>
  action[KEY_BINDING_PROMISE];

export const bindActionToPromise = creator => payload => dispatch =>
  new Promise((resolve, reject) => dispatch({
    ...creator(payload),
    [KEY_BINDING_PROMISE]: { resolve, reject },
  }));
