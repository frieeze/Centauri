import {
  GET_DATABASE,
  GET_DB_ITEM,
  MODIFY_DB_ITEM,
  ADD_DB_ITEM,
  DELETE_DB_ITEM
} from './types';

export const getDatabase = () => {
  return {
    type: GET_DATABASE
  };
};

export const getItem = id => {
  return {
    type: GET_DB_ITEM,
    payload: id
  };
};

export const modifyItem = item => {
  return {
    type: MODIFY_DB_ITEM,
    payload: item
  };
};

export const addItem = item => {
  return {
    type: ADD_DB_ITEM,
    payload: item
  };
};

export const deleteItem = id => {
  return {
    type: DELETE_DB_ITEM,
    payload: id
  };
};
