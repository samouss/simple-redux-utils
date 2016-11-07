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
