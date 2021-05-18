import { NEW_STATS, RESET_STATS, HOME_STATS } from "../actions/types";

const initialState = {
  home: {
    unique: 12,
    total: 1000,
    mail: 205,
    week: {
      unique: 100,
      total: 1100,
      mail: 500,
    },
    month: {
      unique: 1000,
      total: 3235,
      mail: 2390,
    },
  },
  stats: [],
  scale: "",
};

export default function(state = initialState, action) {
  switch (action.type) {
    case NEW_STATS:
      return {
        ...state,
        stats: action.payload.datas,
        scale: action.payload.scale,
      };
    case HOME_STATS:
      return {
        ...state,
        home: action.payload.datas,
      };
    case RESET_STATS:
      return {
        ...state,
        home: {},
        stats: [],
        scale: "",
      };
    default:
      return state;
  }
}
