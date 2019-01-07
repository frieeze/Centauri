import { GET_DATABASE } from '../actions/types';

const initialState = [
  {
    id: '5be9d992435ab213a26a03ad',
    pic: [
      'https://source.unsplash.com/collection/362289/500x300/',
      'https://source.unsplash.com/collection/868514/500x300/',
      'https://source.unsplash.com/collection/2331347/500x300/'
    ],
    tags: ['Fete foraine'],
    name: 'Punching Ball',
    desc: {
      dimension: '12x12x12',
      time: '12min',
      aim: '9-99',
      players: 2,
      pickup: true
    },
    price: 12,
    snap: 'https://source.unsplash.com/collection/623929/500x300/'
  },
  {
    id: '5c1fc610e7179a74879733e8',
    pic: [
      'https://source.unsplash.com/collection/362289/500x300/',
      'https://source.unsplash.com/collection/868514/500x300/',
      'https://source.unsplash.com/collection/2331347/500x300/'
    ],
    tags: ['Jeux gonflables'],
    name: 'Parcours requin',
    desc: {
      dimension: '12x12x12',
      time: '12min',
      aim: '9-99',
      players: 6,
      pickup: false
    },
    price: 12,
    snap: 'https://source.unsplash.com/collection/623929/500x300/'
  },
  {
    id: '5c2112f8fb6fc00eee85be79',
    pic: [
      'https://source.unsplash.com/collection/362289/500x300/',
      'https://source.unsplash.com/collection/868514/500x300/',
      'https://source.unsplash.com/collection/2331347/500x300/'
    ],
    tags: ['Jeux de sumo'],
    name: 'Sumos adulte',
    desc: {
      dimension: '12x12x12',
      time: '2min',
      aim: '18-30',
      players: 2,
      pickup: true
    },
    price: 12,
    snap: 'https://source.unsplash.com/collection/623929/500x300/'
  }
];
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_DATABASE:
      return {
        ...state
      };
    default:
      return state;
  }
}
