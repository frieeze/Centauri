import { NEW_STATS, RESET_STATS, HOME_STATS } from '../actions/types';

const initialState = {
  home: {},
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
    case HOME_STATS:
      return {
        ...state,
        home: action.payload.datas
      };
    case RESET_STATS:
      return {
        ...state,
        home: {},
        stats: [],
        scale: ''
      };
    default:
      return state;
  }
}
