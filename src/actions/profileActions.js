import { GET_PROFILE, LOG_IN, LOG_OUT } from './types';
import axios from 'axios';

export const getProfile = () => {
  return {
    type: GET_PROFILE
  };
};

export const logIn = (user, pwd) => dispatch => {
  axios.post('api/oskur/login', { user: user, pwd: pwd }).then(res => {
    if (res.data.logged) {
      sessionStorage.setItem('auth_token', res.data.token);
      dispatch({
        type: LOG_IN,
        payload: res.data.logged
      });
    } else dispatch({ type: LOG_OUT });
  });
};

export const logOut = () => {
  sessionStorage.clear();
  return {
    type: LOG_OUT
  };
};
