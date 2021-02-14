import {
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGIN_FETCHING,
  LOGOUT,
  server,
  LOGIN_STATUS,
} from "../Constatns";
import { httpClient } from "./../utils/HttpClient";

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
  return async (dispatch) => {
    dispatch(setStateToFetching());
    // setTimeout(() => {
    //   dispatch(setStateToSuccess("OK"));
    //   history.push("/stock");
    // }, 500);

    const result = await httpClient.post(server.LOGIN_URL, {
      username,
      password,
    });
    if (result.data.token) {
      dispatch(setStateToSuccess(result.data.token));
      console.log(result.data.token);
      localStorage.setItem(LOGIN_STATUS, result.data.token);
      history.push("/stock");
    } else {
      localStorage.setItem(LOGIN_STATUS, "nok");
      dispatch(setStateToFailed(result.data.message));
    }
  };
};

export const isLoggedIn = () => {
  const loginStatus = localStorage.getItem(LOGIN_STATUS);
  if (loginStatus) {
    return loginStatus;
  }
};

export const logout = ({ history }) => {
  return (dispatch) => {
    localStorage.removeItem(LOGIN_STATUS);
    dispatch(setStateToLogout());
    history.push("/");
  };
};

export const setSuccess = () => {
  return (dispatch) => {
    dispatch(setStateToSuccess("ok"));
  };
};

export const reLogin = () => {
  return (dispatch) => {
    const loginStatus = localStorage.getItem(LOGIN_STATUS);
    if (loginStatus) {
      dispatch(setStateToSuccess({}));
    }
  };
};

export const hasError = (payload) => {
  return (dispatch) => {
    dispatch(setStateToFailed(payload));
  };
};
