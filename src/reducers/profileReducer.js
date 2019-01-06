import { GET_PROFILE } from '../actions/types';

const initialState = {
  isLogged: true,
  profile: {
    username: 'frieeze'
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state
      };
    default:
      return state;
  }
}
