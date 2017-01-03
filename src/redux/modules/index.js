import { combineReducers } from 'redux';
import auth from './auth';
import profile from './profile';
import events from './events';

export default combineReducers({
  auth,
  profile,
  events,
});
