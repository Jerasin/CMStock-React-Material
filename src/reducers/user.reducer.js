import {
  USER_SUCCESS,
  USER_FETCHING,
  USER_FAILED,
  USER_UPDATED,
} from "./../Constatns.js";

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_SUCCESS:
      return { ...state, result: payload, isFetching: false, isError: false };

    case USER_SUCCESS:
      return { ...state, result: payload, isFetching: false, isError: false };

    case USER_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };

    case USER_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };

    default:
      return state;
  }
};
