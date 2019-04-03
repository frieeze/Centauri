import {
  ADD_CATEGORY,
  DELETE_CATEGORY,
  GET_CATEGORIES,
  GET_CATEGORIES_NAMES,
  GET_CAT_ID
} from "../actions/types";

const initialState = {
  tags: [],
  names: [],
  selected: ""
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
    case GET_CAT_ID:
      return {
        ...state,
        selected: state.tags.filter(cat => cat._id === action.payload)[0]
      };
    default:
      return state;
  }
}
