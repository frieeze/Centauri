import {
  IMAGE_UPLOADED,
  LOG_OUT,
  UPLOADING,
  GET_IMAGE,
  RESET_IMAGE
} from './types';
import axios from 'axios';

export const uploadImage = data => dispatch => {
  uploading();
  axios
    .post('api/oskur/upload-image', data, {
      headers: {
        Authorization: sessionStorage.getItem('auth_token')
      }
    })
    .then(res => {
      console.log(res.data);
      res.data.logged
        ? dispatch({
            type: IMAGE_UPLOADED,
            payload: `http://localhost/uploads/${res.data.img.filename}`
          })
        : dispatch({ type: LOG_OUT });
    });
};

export const resetImage = () => {
  return {
    type: RESET_IMAGE
  };
};

export const getImage = () => {
  return {
    type: GET_IMAGE
  };
};

export const uploading = () => {
  return {
    type: UPLOADING
  };
};
