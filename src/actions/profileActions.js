import { GET_PROFILE, LOG_IN, LOG_OUT, LOG_ERROR } from './types';
import axios from 'axios';

export const getProfile = () => {
  return {
    type: GET_PROFILE
  };
};

export const logIn = (user, pwd) => dispatch => {
  axios.post('api/auth/login', { username: user, password: pwd }).then(res => {
    console.log(res.data);
    if (res.data.logged) {
      sessionStorage.setItem('auth_token', 'Bearer ' + res.data.token);
      dispatch({
        type: LOG_IN,
        payload: res.data.logged
      });
    } else dispatch({ type: LOG_ERROR });
  });
};

export const logOut = () => {
  sessionStorage.clear();
  return {
    type: LOG_OUT
  };
};
