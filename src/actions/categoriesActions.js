import {
  ADD_CATEGORY,
  DELETE_CATEGORY,
  GET_CATEGORIES,
  GET_CATEGORIES_NAMES,
  LOG_OUT
} from "./types";
import axios from "axios";

export const getCategories = () => dispatch => {
  axios
    .get("api/tags", {
      headers: {
        Authorization: sessionStorage.getItem("auth_token")
      }
    })
    .then(res => {
      dispatch({
        type: GET_CATEGORIES,
        payload: res.data.data
      });
    });
};

export const addCategory = category => dispatch => {
  axios
    .post(
      "api/tags",
      {
        tag: category
      },
      {
        headers: {
          Authorization: sessionStorage.getItem("auth_token")
        }
      }
    )
    .then(res => {
      res.data.logged
        ? dispatch({
            type: ADD_CATEGORY,
            payload: res.data.msg
          })
        : dispatch({
            type: LOG_OUT
          });
    });
};

export const deleteCategory = id => dispatch => {
  axios
    .delete(`api/tags/${id}`, {
      headers: {
        Authorization: sessionStorage.getItem("auth_token")
      }
    })
    .then(res => {
      res.data.logged
        ? dispatch({
            type: DELETE_CATEGORY,
            payload: id
          })
        : dispatch({
            type: LOG_OUT
          });
    });
};

export const getCategoriesNames = () => {
  return {
    type: GET_CATEGORIES_NAMES
  };
};
