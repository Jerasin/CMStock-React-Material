import {
  STOCK_FETCHING,
  STOCK_SUCCESS,
  STOCK_FAILED,
  server,
} from "../Constatns";
import { httpClient } from "../utils/HttpClient";

export const setStateToFetch = () => ({
  type: STOCK_FETCHING,
});

export const setStateToSuccess = (payload) => ({
  type: STOCK_SUCCESS,
  payload,
});

export const setStateToFailed = () => ({
  type: STOCK_FAILED,
});

export const getProducts = () => {
  return (dispatch) => {
    dispatch(setStateToFetch());
    doGetProducts(dispatch);
  };
};

const doGetProducts = async (dispatch) => {
  try {
    let result = await httpClient.get(server.PRODUCT_URL);
    dispatch(setStateToSuccess(result.data));
  } catch (err) {
    dispatch(setStateToFailed());
  }
};

export const addProduct = (formData, history) => {
  return async (dispatch) => {
    await httpClient.post(server.PRODUCT_URL, formData);
    history.goBack();
  };
};
