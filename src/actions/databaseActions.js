import {
  GET_DATABASE,
  GET_DB_ITEM,
  MODIFY_DB_ITEM,
  ADD_DB_ITEM,
  DELETE_DB_ITEM,
  LOG_OUT
} from './types';
import axios from 'axios';

export const getDatabase = () => dispatch => {
  axios
    .get('api/oskur/games', {
      headers: {
        Authorization: sessionStorage.getItem('auth_token')
      }
    })
    .then(res => {
      res.data.logged
        ? dispatch({ type: GET_DATABASE, payload: res.data.data })
        : dispatch({ type: LOG_OUT });
    });
};

export const getItem = id => {
  return {
    type: GET_DB_ITEM,
    payload: id
  };
};

export const modifyItem = item => dispatch => {
  axios
    .post(
      'api/oskur/modgame',
      { game: item },
      {
        headers: {
          Authorization: sessionStorage.getItem('auth_token')
        }
      }
    )
    .then(res => {
      res.data.logged
        ? dispatch({ type: MODIFY_DB_ITEM, payload: item })
        : dispatch({ type: LOG_OUT });
    });
};

export const addItem = item => dispatch => {
  axios
    .post(
      'api/oskur/game',
      { game: item },
      {
        headers: {
          Authorization: sessionStorage.getItem('auth_token')
        }
      }
    )
    .then(res => {
      res.data.logged
        ? dispatch({ type: ADD_DB_ITEM, payload: res.data.data })
        : dispatch({ type: LOG_OUT });
    });
};

export const deleteItem = id => dispatch => {
  axios
    .delete(`api/oskur/game/${id}`, {
      headers: {
        Authorization: sessionStorage.getItem('auth_token')
      }
    })
    .then(res => {
      res.data.logged
        ? dispatch({ type: DELETE_DB_ITEM, payload: id })
        : dispatch({ type: LOG_OUT });
    });
};
