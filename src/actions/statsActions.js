import { NEW_STATS, RESET_STATS, HOME_STATS, LOG_OUT } from "./types";
import axios from "axios";

export const getStats = (scale, begin, end) => (dispatch) => {
  let datas;
  if (scale === "week") {
    datas = [
      { day: { week: 1 }, total: 120, unique: 50, mail: 10 },
      { day: { week: 2 }, total: 300, unique: 93, mail: 24 },
      { day: { week: 3 }, total: 539, unique: 140, mail: 35 },
      { day: { week: 4 }, total: 343, unique: 232, mail: 15 },
      { day: { week: 5 }, total: 403, unique: 190, mail: 10 },
      { day: { week: 6 }, total: 195, unique: 35, mail: 13 },
      { day: { week: 7 }, total: 753, unique: 394, mail: 37 },
    ];
  } else if (scale === "month") {
    datas = [
      { day: { month: 0 }, total: 155, unique: 39, mail: 5 },
      { day: { month: 1 }, total: 120, unique: 50, mail: 10 },
      { day: { month: 2 }, total: 300, unique: 93, mail: 24 },
      { day: { month: 3 }, total: 539, unique: 140, mail: 35 },
      { day: { month: 4 }, total: 343, unique: 232, mail: 15 },
      { day: { month: 5 }, total: 403, unique: 190, mail: 10 },
      { day: { month: 6 }, total: 195, unique: 35, mail: 13 },
      { day: { month: 7 }, total: 753, unique: 394, mail: 37 },
      { day: { month: 8 }, total: 120, unique: 50, mail: 10 },
      { day: { month: 9 }, total: 539, unique: 140, mail: 35 },
      { day: { month: 10 }, total: 343, unique: 232, mail: 15 },
      { day: { month: 11 }, total: 403, unique: 190, mail: 10 },
      { day: { month: 12 }, total: 195, unique: 35, mail: 13 },
      { day: { month: 13 }, total: 753, unique: 394, mail: 37 },
      { day: { month: 14 }, total: 120, unique: 50, mail: 10 },
      { day: { month: 15 }, total: 300, unique: 93, mail: 24 },
      { day: { month: 16 }, total: 539, unique: 140, mail: 35 },
      { day: { month: 17 }, total: 343, unique: 232, mail: 15 },
      { day: { month: 18 }, total: 403, unique: 190, mail: 10 },
      { day: { month: 19 }, total: 195, unique: 35, mail: 13 },
      { day: { month: 20 }, total: 753, unique: 394, mail: 37 },
      { day: { month: 21 }, total: 120, unique: 50, mail: 10 },
      { day: { month: 22 }, total: 300, unique: 93, mail: 24 },
      { day: { month: 23 }, total: 539, unique: 140, mail: 35 },
      { day: { month: 24 }, total: 343, unique: 232, mail: 15 },
      { day: { month: 25 }, total: 403, unique: 190, mail: 10 },
      { day: { month: 26 }, total: 195, unique: 35, mail: 13 },
      { day: { month: 27 }, total: 753, unique: 394, mail: 37 },
      { day: { month: 28 }, total: 604, unique: 320, mail: 46 },
      { day: { month: 29 }, total: 689, unique: 348, mail: 21 },
    ];
  }

  dispatch({
    type: NEW_STATS,
    payload: { datas: datas, scale: scale },
  });
  // axios
  //   .get(
  //     begin && end
  //       ? `api/analytic/${scale}?begin=${begin}&end=${end}`
  //       : `api/analytic/${scale}`,
  //     {
  //       headers: {
  //         Authorization: sessionStorage.getItem("auth_token"),
  //       },
  //     }
  //   )
  //   .then((res) => {
  //     if (res.data.logged) {
  //       dispatch({
  //         type: NEW_STATS,
  //         payload: { datas: res.data.data, scale: scale },
  //       });
  //     } else {
  //       dispatch({ type: LOG_OUT });
  //     }
  //   });
};

export const getHomeStats = () => (dispatch) => {
  return;
  // axios
  //   .get("api/analytic/home", {
  //     headers: {
  //       Authorization: sessionStorage.getItem("auth_token")
  //     }
  //   })
  //   .then(res =>
  //     res.data.logged
  //       ? dispatch({
  //           type: HOME_STATS,
  //           payload: { datas: res.data.data, scale: "" }
  //         })
  //       : dispatch({ type: LOG_OUT })
  //   );
};

export const resetStats = () => {
  return { type: RESET_STATS };
};
