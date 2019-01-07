import {
  GET_GEN,
  SAVE_DELPIC,
  ADD_CAROUSEL,
  DELETE_CAROUSEL
} from '../actions/types';
const initialState = {
  pickdelinfo: {
    pickup:
      'Le retrait se fait le jeudi et le vendredi entre 17h30 et 18h30, et le retour le lundi entre 17h30 et 18h30. Une caution vous sera demandé pour chaque article.',
    delivery:
      'Frais de livraisons à moins de 25 km de Gonnehem (62920) : 50€. Pour de plus longues distances merci de nous contacter.'
  },
  carousel: [
    'https://source.unsplash.com/1600x600/?universe',
    'https://source.unsplash.com/1600x600/?space',
    'https://source.unsplash.com/1600x600/?galaxy'
  ]
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_GEN:
      return {
        ...state
      };
    case ADD_CAROUSEL:
      return {
        ...state,
        carousel: [action.payload, ...state.carousel]
      };
    case DELETE_CAROUSEL:
      return {
        ...state,
        carousel: state.carousel.filter(img => img !== action.payload)
      };
    case SAVE_DELPIC:
      return {
        ...state,
        pickdelinfo: action.payload
      };
    default:
      return state;
  }
}
