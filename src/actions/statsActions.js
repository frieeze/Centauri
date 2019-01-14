import { NEW_STATS, RESET_STATS, LOG_OUT } from './types';
import axios from 'axios';

export const getStats = (scale, begin, end) => dispatch => {
  axios
    .get(
      begin && end
        ? `api/analytic/${scale}?begin=${begin}&end=${end}`
        : `api/analytic/${scale}`,
      {
        headers: {
          Authorization: sessionStorage.getItem('auth_token')
        }
      }
    )
    .then(res => {
      if (res.data.logged) {
        dispatch({
          type: NEW_STATS,
          payload: { datas: res.data.data, scale: scale }
        });
      } else {
        dispatch({ type: LOG_OUT });
      }
    });
};

export const resetStats = () => {
  return { type: RESET_STATS };
};
