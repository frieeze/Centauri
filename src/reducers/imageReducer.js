import {
  IMAGE_UPLOADED,
  UPLOADING,
  RESET_IMAGE,
  GET_IMAGE,
  SNAP_UPLOADED,
  PIC_UPLOADED,
  PIC_DELETE
} from '../actions/types';

const initialState = {
  uploading: false,
  img: undefined,
  snap: undefined,
  pic: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case IMAGE_UPLOADED:
      return {
        ...state,
        img: action.payload,
        uploading: false
      };
    case SNAP_UPLOADED:
      return {
        ...state,
        snap: action.payload,
        uploading: false
      };
    case PIC_UPLOADED:
      return {
        ...state,
        pic: [action.payload, ...state.pic],
        uploading: false
      };
    case PIC_DELETE:
      return {
        ...state,
        pic: state.pic.filter(img => img !== action.payload)
      };
    case GET_IMAGE:
      return {
        ...state
      };
    case RESET_IMAGE:
      return {
        ...state,
        img: undefined,
        snap: undefined,
        pic: undefined
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
