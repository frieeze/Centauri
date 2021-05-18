import {
  GET_GEN,
  SAVE_DELPIC,
  ADD_CAROUSEL,
  DELETE_CAROUSEL,
} from "../actions/types";
const initialState = {
  pickdelinfo: {},
  carousel: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_GEN:
      return {
        ...state,
        pickdelinfo: action.payload.pickdelinfo,
        carousel: action.payload.carousel,
      };
    case ADD_CAROUSEL:
      return {
        ...state,
        carousel: [action.payload.carousel, ...state.carousel],
      };
    case DELETE_CAROUSEL:
      return {
        ...state,
        carousel: state.carousel.filter(
          (img) => img !== action.payload.carousel
        ),
      };
    case SAVE_DELPIC:
      return {
        ...state,
        pickdelinfo: action.payload.pickdelinfo,
      };
    default:
      return state;
  }
}
