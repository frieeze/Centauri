import {
  GET_GEN,
  SAVE_DELPIC,
  ADD_CAROUSEL,
  DELETE_CAROUSEL,
  LOG_OUT,
} from "./types";
import axios from "axios";

export const getGeneral = () => (dispatch) => {
  dispatch({
    type: GET_GEN,
    payload: {
      pickdelinfo: {
        delivery: "delivery conditions",
        pickup: "pickup conditions",
      },
      carousel: [
        "https://source.unsplash.com/0o_GEzyargo/1600x900",
        "https://source.unsplash.com/random/1600x900",
      ],
    },
  });
  // axios
  //   .get("api/oskur/general", {
  //     headers: {
  //       Authorization: sessionStorage.getItem("auth_token")
  //     }
  //   })
  //   .then(res => {
  //     res.data.logged
  //       ? dispatch({
  //           type: GET_GEN,
  //           payload: res.data.msg
  //         })
  //       : dispatch({ type: LOG_OUT });
  //   });
};

export const deleteCarousel = (image) => (dispatch) => {
  dispatch({
    type: DELETE_CAROUSEL,
    payload: image,
  });
  // axios
  //   .delete(`api/oskur/carousel/${image}`, {
  //     headers: {
  //       Authorization: sessionStorage.getItem("auth_token"),
  //     },
  //   })
  //   .then((res) => {
  //     res.data.logged
  //       ? dispatch({
  //           type: DELETE_CAROUSEL,
  //           payload: res.data.data,
  //         })
  //       : dispatch({ type: LOG_OUT });
  //   });
};

export const addCarousel = (image) => (dispatch) => {
  dispatch({
    type: ADD_CAROUSEL,
    payload: image,
  });
  // axios
  //   .post(
  //     "api/oskur/carousel",
  //     { image: image },
  //     {
  //       headers: {
  //         Authorization: sessionStorage.getItem("auth_token"),
  //       },
  //     }
  //   )
  //   .then((res) => {
  //     res.data.logged
  //       ? dispatch({
  //           type: ADD_CAROUSEL,
  //           payload: res.data.data,
  //         })
  //       : dispatch({ type: LOG_OUT });
  //   });
};

export const saveDelpic = (delpic) => (dispatch) => {
  dispatch({
    type: SAVE_DELPIC,
    payload: delpic,
  });
  // axios
  //   .post(
  //     "api/oskur/delpic",
  //     { pickdelinfo: delpic },
  //     {
  //       headers: {
  //         Authorization: sessionStorage.getItem("auth_token"),
  //       },
  //     }
  //   )
  //   .then((res) => {
  //     res.data.logged
  //       ? dispatch({
  //           type: SAVE_DELPIC,
  //           payload: res.data.data,
  //         })
  //       : dispatch({ type: LOG_OUT });
  //   });
};
