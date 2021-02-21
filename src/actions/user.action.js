import {
  USER_FETCHING,
  USER_SUCCESS,
  USER_FAILED,
  USER_UPDATED,
  server,
  LOGIN_STATUS,
} from "../Constatns";

import { httpClient } from "../utils/HttpClient";

export const setStateToFetch = () => ({
  type: USER_FETCHING,
});

export const setStateToSuccess = (payload) => ({
  type: USER_SUCCESS,
  payload,
});

export const setStateToFailed = () => ({
  type: USER_FAILED,
});

export const setStateToUpdated = (payload) => ({
  type: USER_UPDATED,
  payload,
});

export const getUser = () => {
  const loginStatus = localStorage.getItem(LOGIN_STATUS);
  return (dispatch) => {
    if (loginStatus) {
      dispatch(setStateToFetch());
      doGetUser(dispatch);
    }
  };
};

export const addUser = (values, history) => {
  return async (dispatch) => {
    let result = await httpClient.post(
      "http://localhost:8085/api/v2/authen/register",
      values
    );
    dispatch(setStateToUpdated(result.data));
    history.goBack();
  };
};

export const updateProduct = (formData, history) => {
  return async (dispatch) => {
    await httpClient.put(server.PRODUCT_URL, formData);
    history.goBack();
  };
};

export const deleteUser = (id) => {
  return async (dispatch) => {
    debugger;
    await httpClient.delete(`/authen/user/${id}`);
    await doGetUser(dispatch);
  };
};

const doGetUser = async (dispatch) => {
  try {
    let result = await httpClient.get(server.USERS_URL);
    // debugger;
    dispatch(setStateToSuccess(result.data));
  } catch (err) {
    dispatch(setStateToFailed());
  }
};

export const getUserById = (id) => {
  const loginStatus = localStorage.getItem(LOGIN_STATUS);
  if (loginStatus) {
    return async (dispatch) => {
      try {
        dispatch(setStateToFetch());
        let result = await httpClient.get(`${server.USERS_URL}/${id}`);
        // let data = {
        //   username: result.data.username,
        //   password: " ",
        //   level: result.data.level,
        // };
        result.data = {
          ...result.data,
          password: "",
        };
        dispatch(setStateToSuccess(result.data));
        // alert(JSON.stringify(result.data));
      } catch (error) {
        alert(JSON.stringify(error));
        dispatch(setStateToFailed());
      }
    };
  }
};

export const updateUser = (values, history) => {
  return async (dispatch) => {
    let result = await httpClient.put(
      "http://localhost:8085/api/v2/authen/user",
      values
    );
    dispatch(setStateToUpdated(result.data));
    history.goBack();
  };
};
