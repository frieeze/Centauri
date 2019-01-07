import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import profileReducer from './profileReducer';
import databaseReducer from './databaseReducer';
import generalReducer from './generalReducer';
import categoriesReducer from './categoriesReducer';

export default combineReducers({
  profile: profileReducer,
  database: databaseReducer,
  general: generalReducer,
  categories: categoriesReducer
});
