import { combineReducers } from 'redux';
import auth from './auth';
import profile from './profile';
import events from './events';
import editCreateEvent from './editCreateEvent';

export default combineReducers({
  auth,
  profile,
  events,
  editCreateEvent,
});
