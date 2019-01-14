import { NEW_STATS, RESET_STATS } from '../actions/types';

const initialState = {
  stats: [],
  scale: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case NEW_STATS:
      return {
        ...state,
        stats: action.payload.datas,
        scale: action.payload.scale
      };
    case RESET_STATS:
      return {
        ...state,
        stats: [],
        scale: ''
      };
    default:
      return state;
  }
}
