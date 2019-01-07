import {
  MODIFY_CATEGORY,
  ADD_CATEGORY,
  DELETE_CATEGORY,
  GET_CATEGORIES
} from './types';

export const getCategories = () => {
  return {
    type: GET_CATEGORIES
  };
};

export const modifyCategory = category => {
  return {
    type: MODIFY_CATEGORY,
    payload: category
  };
};

export const addCategory = category => {
  return {
    type: ADD_CATEGORY,
    payload: category
  };
};

export const deleteCategory = id => {
  return {
    type: DELETE_CATEGORY,
    payload: id
  };
};
