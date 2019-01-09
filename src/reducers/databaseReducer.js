import {
  GET_DATABASE,
  GET_DB_ITEM,
  MODIFY_DB_ITEM,
  ADD_DB_ITEM,
  DELETE_DB_ITEM
} from '../actions/types';

const initialState = {
  database: [],
  selected: {
    id: undefined,
    pic: ['Lorem Ipsum'],
    tags: ['Jeux de sumo'],
    name: 'placeholder',
    desc: {
      dimension: 'Lorem Ipsum',
      time: 'Lorem Ipsum',
      aim: 'Lorem Ipsum',
      players: 0,
      pickup: false
    },
    price: 0,
    snap: 'Lorem Ipsum'
  }
};
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_DATABASE:
      return {
        ...state,
        database: action.payload
      };
    case MODIFY_DB_ITEM:
      return {
        ...state,
        database: state.database.map(item => {
          return item._id === action.payload._id ? action.payload : item;
        })
      };
    case ADD_DB_ITEM:
      return {
        ...state,
        database: [...state.database, action.payload]
      };
    case DELETE_DB_ITEM:
      return {
        ...state,
        database: state.database.filter(item => item._id !== action.payload)
      };
    case GET_DB_ITEM:
      return {
        ...state,
        selected: state.database.filter(item => item._id === action.payload)[0]
      };
    default:
      return state;
  }
}
