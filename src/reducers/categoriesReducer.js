import {
  ADD_CATEGORY,
  DELETE_CATEGORY,
  GET_CATEGORIES,
  GET_CATEGORIES_NAMES
} from '../actions/types';

const initialState = {
  tags: [],
  names: []
};
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return {
        ...state,
        tags: action.payload
      };
    case ADD_CATEGORY:
      return {
        ...state,
        tags: [...state.tags, action.payload]
      };
    case DELETE_CATEGORY:
      return {
        ...state,
        tags: state.tags.filter(cat => cat._id !== action.payload)
      };
    case GET_CATEGORIES_NAMES:
      return {
        ...state,
        names: state.tags.map(cat => cat.name)
      };
    default:
      return state;
  }
}
