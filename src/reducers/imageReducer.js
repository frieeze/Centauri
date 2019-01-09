import {
  IMAGE_UPLOADED,
  UPLOADING,
  RESET_IMAGE,
  GET_IMAGE
} from '../actions/types';

const initialState = {
  uploading: false,
  img: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case IMAGE_UPLOADED:
      return {
        ...state,
        img: action.payload,
        uploading: false
      };
    case GET_IMAGE:
      return {
        ...state
      };
    case RESET_IMAGE:
      return {
        ...state,
        img: ''
      };
    case UPLOADING:
      return {
        ...state,
        uploading: true
      };
    default:
      return state;
  }
}
