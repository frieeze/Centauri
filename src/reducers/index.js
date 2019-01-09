import { combineReducers } from 'redux';
import profileReducer from './profileReducer';
import databaseReducer from './databaseReducer';
import generalReducer from './generalReducer';
import categoriesReducer from './categoriesReducer';
import imageReducer from './imageReducer';

export default combineReducers({
  profile: profileReducer,
  database: databaseReducer,
  general: generalReducer,
  categories: categoriesReducer,
  image: imageReducer
});
