import { GET_PROFILE, LOG_IN, LOG_OUT } from '../actions/types';

const initialState = {
  isLogged: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state
      };
    case LOG_IN:
      return {
        ...state,
        isLogged: action.payload
      };
    case LOG_OUT:
      return {
        ...state,
        isLogged: false
      };
    default:
      return state;
  }
}
