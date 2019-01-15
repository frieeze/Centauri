import {
  IMAGE_UPLOADED,
  LOG_OUT,
  UPLOADING,
  GET_IMAGE,
  RESET_IMAGE,
  SNAP_UPLOADED,
  PIC_UPLOADED,
  PIC_DELETE
} from './types';
import axios from 'axios';

export const uploadImage = (data, name) => dispatch => {
  uploading();
  axios
    .post('api/oskur/upload-image', data, {
      headers: {
        Authorization: localStorage.getItem('auth_token')
      }
    })
    .then(res => {
      console.log(res.data);
      res.data.logged
        ? dispatch({
            type:
              name === 'snap'
                ? SNAP_UPLOADED
                : name === 'pic'
                ? PIC_UPLOADED
                : IMAGE_UPLOADED,
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

export const deletePic = name => {
  return {
    type: PIC_DELETE,
    payload: name
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
