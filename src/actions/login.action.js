import {
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGIN_FETCHING,
  LOGOUT,
} from "../Constatns";

export const setStateToFetching = () => ({
  type: LOGIN_FETCHING,
});

export const setStateToSuccess = (payload) => ({
  type: LOGIN_SUCCESS,
  payload,
});

export const setStateToFailed = (payload) => ({
  type: LOGIN_FAILED,
  payload,
});

export const setStateToLogout = () => ({
  type: LOGOUT,
});

export const login = ({ username, password, history }) => {
  return (dispatch) => {
    dispatch(setStateToFetching());
    setTimeout(() => {
      dispatch(setStateToSuccess("OK"));
      history.push("/stock");
    }, 500);
  };
};

export const logout = ({ history }) => {
  return (dispatch) => {
    dispatch(setStateToLogout());
    history.push("/");
  };
};
