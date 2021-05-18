import {
  GET_DATABASE,
  GET_DB_ITEM,
  MODIFY_DB_ITEM,
  ADD_DB_ITEM,
  DELETE_DB_ITEM,
  LOG_OUT,
} from "./types";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export const getDatabase = () => (dispatch) => {
  dispatch({
    type: GET_DATABASE,
    payload: [
      {
        _id: uuidv4(),
        pic: [
          "https://source.unsplash.com/random/1600x900",
          "https://source.unsplash.com/random/1600x900",
        ],
        tags: ["Category 1", "Category 2"],
        name: "Product 1",
        desc: {
          dimension: "Lorem Ipsum",
          time: "Lorem Ipsum",
          aim: "Lorem Ipsum",
          players: 0,
          pickup: false,
        },
        price: 0,
        snap: "https://source.unsplash.com/gWim_hPISWI/1600x900",
      },
      {
        _id: uuidv4(),
        pic: [
          "https://source.unsplash.com/random/1600x900",
          "https://source.unsplash.com/random/1600x900",
          "https://source.unsplash.com/random/1600x900",
        ],
        tags: ["Category 3"],
        name: "Product 2",
        desc: {
          dimension: "Lorem Ipsum",
          time: "Lorem Ipsum",
          aim: "Lorem Ipsum",
          players: 0,
          pickup: false,
        },
        price: 0,
        snap: "https://source.unsplash.com/p_8H2LvD6ck/1600x900",
      },
    ],
  });
  // axios
  //   .get("api/oskur/games", {
  //     headers: {
  //       Authorization: sessionStorage.getItem("auth_token")
  //     }
  //   })
  //   .then(res => {
  //     res.data.logged
  //       ? dispatch({ type: GET_DATABASE, payload: res.data.data })
  //       : dispatch({ type: LOG_OUT });
  //   });
};

export const getItem = (id) => {
  return {
    type: GET_DB_ITEM,
    payload: id,
  };
};

export const modifyItem = (item) => (dispatch) => {
  dispatch({ type: MODIFY_DB_ITEM, payload: item });
  // axios
  //   .post(
  //     "api/oskur/modgame",
  //     { game: item },
  //     {
  //       headers: {
  //         Authorization: sessionStorage.getItem("auth_token"),
  //       },
  //     }
  //   )
  //   .then((res) => {
  //     res.data.logged
  //       ? dispatch({ type: MODIFY_DB_ITEM, payload: item })
  //       : dispatch({ type: LOG_OUT });
  //   });
};

export const addItem = (item) => (dispatch) => {
  item._id = uuidv4();
  dispatch({ type: ADD_DB_ITEM, payload: item });
  // axios
  //   .post(
  //     "api/oskur/game",
  //     { game: item },
  //     {
  //       headers: {
  //         Authorization: sessionStorage.getItem("auth_token"),
  //       },
  //     }
  //   )
  //   .then((res) => {
  //     res.data.logged
  //       ? dispatch({ type: ADD_DB_ITEM, payload: res.data.data })
  //       : dispatch({ type: LOG_OUT });
  //   });
};

export const deleteItem = (id) => (dispatch) => {
  dispatch({ type: DELETE_DB_ITEM, payload: id });
  // axios
  //   .delete(`api/oskur/game/${id}`, {
  //     headers: {
  //       Authorization: sessionStorage.getItem("auth_token"),
  //     },
  //   })
  //   .then((res) => {
  //     res.data.logged
  //       ? dispatch({ type: DELETE_DB_ITEM, payload: id })
  //       : dispatch({ type: LOG_OUT });
  //   });
};
