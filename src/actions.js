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

export const KEY_BINDING_PROMISE = Symbol('simple-redux-utils/KEY_BINDING_PROMISE');
export const bindActionToPromise = action => dispatch =>
  new Promise((resolve, reject) => dispatch({
    ...action,
    [KEY_BINDING_PROMISE]: { resolve, reject },
  }));
