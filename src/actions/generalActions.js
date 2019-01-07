import { GET_GEN, SAVE_DELPIC, ADD_CAROUSEL, DELETE_CAROUSEL } from './types';

export const getGeneral = () => {
  return {
    type: GET_GEN
  };
};

export const deleteCarousel = image => {
  return {
    type: DELETE_CAROUSEL,
    payload: image
  };
};

export const addCarousel = image => {
  return {
    type: ADD_CAROUSEL,
    payload: image
  };
};

export const saveDelpic = delpic => {
  return {
    type: SAVE_DELPIC,
    payload: delpic
  };
};
