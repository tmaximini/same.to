import { combineReducers } from 'redux';
import auth from './auth';
import profile from './profile';
import events from './events';
import newEvent from './newEvent';

export default combineReducers({
  auth,
  profile,
  events,
  newEvent
});
