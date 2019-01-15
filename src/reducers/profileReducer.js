import { GET_PROFILE, LOG_IN, LOG_OUT, LOG_ERROR } from '../actions/types';

const initialState = {
  isLogged: true,
  logError: false
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
        isLogged: true
      };
    case LOG_ERROR:
      return {
        ...state,
        logError: true,
        isLogged: false
      };
    case LOG_OUT:
      return {
        ...state,
        isLogged: false,
        logError: false
      };
    default:
      return state;
  }
}
