export const createReducer = (initialState, handlers) =>
  (state = initialState, action) => {
    if (!{}.hasOwnProperty.call(handlers, action.type)) {
      return state;
    }

    return handlers[action.type](state, action);
  };
