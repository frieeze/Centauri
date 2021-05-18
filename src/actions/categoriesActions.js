import {
  ADD_CATEGORY,
  DELETE_CATEGORY,
  GET_CATEGORIES,
  GET_CATEGORIES_NAMES,
  GET_CAT_ID,
  LOG_OUT,
} from "./types";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

export const getCategories = () => (dispatch) => {
  dispatch({
    type: GET_CATEGORIES,
    payload: [
      {
        _id: 0,
        name: "Category 1",
        snap: "https://source.unsplash.com/0o_GEzyargo/1600x900",
      },
      {
        _id: 1,
        name: "Category 2",
        snap: "https://source.unsplash.com/0o_GEzyargo/1600x900",
      },
      {
        _id: 2,
        name: "Category 3",
        snap: "https://source.unsplash.com/0o_GEzyargo/1600x900",
      },
    ],
  });
  // axios
  //   .get("api/tags", {
  //     headers: {
  //       Authorization: sessionStorage.getItem("auth_token"),
  //     },
  //   })
  //   .then((res) => {
  //     dispatch({
  //       type: GET_CATEGORIES,
  //       payload: res.data.data,
  //     });
  //   });
};

export const addCategory = (category) => (dispatch) => {
  dispatch({
    type: ADD_CATEGORY,
    payload: {
      _id: uuidv4(),
      name: category.name,
      snap: "https://source.unsplash.com/random/1600x900",
    },
  });
  // axios
  //   .post(
  //     "api/tags/add",
  //     {
  //       tag: category,
  //     },
  //     {
  //       headers: {
  //         Authorization: sessionStorage.getItem("auth_token"),
  //       },
  //     }
  //   )
  //   .then((res) => {
  //     res.data.logged
  //       ? dispatch({
  //           type: ADD_CATEGORY,
  //           payload: res.data.msg,
  //         })
  //       : dispatch({
  //           type: LOG_OUT,
  //         });
  //   });
};

export const deleteCategory = (id) => (dispatch) => {
  dispatch({
    type: DELETE_CATEGORY,
    payload: id,
  });
  // axios
  //   .delete(`api/tags/${id}`, {
  //     headers: {
  //       Authorization: sessionStorage.getItem("auth_token"),
  //     },
  //   })
  //   .then((res) => {
  //     res.data.logged
  //       ? dispatch({
  //           type: DELETE_CATEGORY,
  //           payload: id,
  //         })
  //       : dispatch({
  //           type: LOG_OUT,
  //         });
  //   });
};

export const modifyCategory = (cats, mod) => (dispatch) => {
  dispatch({
    type: GET_CATEGORIES,
    payload: cats,
  });
  // axios
  //   .post(
  //     "api/tags/update",
  //     {
  //       order: cats,
  //       mod: mod,
  //     },
  //     {
  //       headers: {
  //         Authorization: sessionStorage.getItem("auth_token"),
  //       },
  //     }
  //   )
  //   .then((res) => {
  //     res.data.logged
  //       ? dispatch({
  //           type: GET_CATEGORIES,
  //           payload: res.data.msg,
  //         })
  //       : dispatch({
  //           type: LOG_OUT,
  //         });
  //   });
};

export const getCategoriesNames = () => {
  return {
    type: GET_CATEGORIES_NAMES,
  };
};

export const getCatById = (id) => {
  return {
    type: GET_CAT_ID,
    payload: id,
  };
};
