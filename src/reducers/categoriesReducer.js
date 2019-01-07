import {
  ADD_CATEGORY,
  DELETE_CATEGORY,
  GET_CATEGORIES,
  MODIFY_CATEGORY
} from '../actions/types';
import uuid from 'uuid';

const initialState = {
  tags: [
    {
      id: uuid(),
      name: 'Fete foraine',
      snap: 'https://source.unsplash.com/500x300/?ferris-wheel'
    },
    {
      id: uuid(),
      name: 'Jeux gonflables',
      snap: 'https://source.unsplash.com/collection/369/500x300/'
    },
    {
      id: uuid(),
      name: 'Baby foot géants',
      snap: 'https://source.unsplash.com/collection/369/500x300/'
    },
    {
      id: uuid(),
      name: 'Jeux de sumo',
      snap: 'https://source.unsplash.com/collection/369/500x300/'
    },
    {
      id: uuid(),
      name: 'Jeux mécaniques',
      snap: 'https://source.unsplash.com/collection/369/500x300/'
    },
    {
      id: uuid(),
      name: 'Jeux estaminés',
      snap: 'https://source.unsplash.com/collection/369/500x300/'
    },
    {
      id: uuid(),
      name: 'Jeux géants',
      snap: 'https://source.unsplash.com/collection/369/500x300/'
    },
    {
      id: uuid(),
      name: 'Mobilier',
      snap: 'https://source.unsplash.com/collection/369/500x300/'
    },
    {
      id: uuid(),
      name: 'Restauration',
      snap: 'https://source.unsplash.com/collection/369/500x300/'
    },
    {
      id: uuid(),
      name: 'Chapitaux',
      snap: 'https://source.unsplash.com/collection/369/500x300/'
    }
  ]
};
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return {
        ...state
      };
    case ADD_CATEGORY:
      return {
        ...state,
        tags: [...state.tags, action.payload]
      };
    case DELETE_CATEGORY:
      return {
        ...state,
        tags: state.tags.filter(cat => cat.id !== action.payload)
      };
    case MODIFY_CATEGORY:
      return {
        ...state,
        tags: state.tags.map(cat => {
          if (cat.id === action.payload.id) {
            return action.payload;
          } else {
            return cat;
          }
        })
      };
    default:
      return state;
  }
}
