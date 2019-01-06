import { combineReducers } from 'redux';
import profileReducer from './profileReducer';
import databaseReducer from './databaseReducer';

export default combineReducers({
  profile: profileReducer,
  database: databaseReducer
});
