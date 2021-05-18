import { GET_PROFILE, LOG_IN, LOG_OUT, LOG_ERROR } from "./types";
import axios from "axios";

export const getProfile = () => {
  return {
    type: GET_PROFILE,
  };
};

export const logTest = () => (dispatch) => {
  if (localStorage.getItem("auth_token") === "logged") {
    dispatch({ type: LOG_IN });
  } else {
    dispatch({ type: LOG_OUT });
  }
  // axios
  //   .post(
  //     "api/auth/test",
  //     {},
  //     {
  //       headers: {
  //         Authorization: sessionStorage.getItem("auth_token")
  //       }
  //     }
  //   )
  //   .then(res =>
  //     res.data.logged ? dispatch({ type: LOG_IN }) : dispatch({ type: LOG_OUT })
  //   );
};

export const logIn = (user, pwd) => (dispatch) => {
  if (user === "admin" && pwd === "admin") {
    dispatch({ type: LOG_IN });
    localStorage.setItem("auth_token", "logged");
  } else {
    dispatch({ type: LOG_ERROR });
  }
  // axios
  //   .post("api/auth/login", { username: user, password: pwd })
  //   .then((res) => {
  //     if (res.data.logged) {
  //       sessionStorage.setItem("auth_token", "Bearer " + res.data.token);
  //       dispatch({
  //         type: LOG_IN,
  //       });
  //     } else dispatch({ type: LOG_ERROR });
  //   });
};

export const logOut = () => {
  localStorage.clear();
  return {
    type: LOG_OUT,
  };
};
