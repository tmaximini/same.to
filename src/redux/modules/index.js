import { combineReducers } from 'redux';
import auth from './auth';
import profile from './profile';
import events from './events';
import editCreateEvent from './editCreateEvent';
import editCreateTrip from './editCreateTrip';
import editCreateAccommodation from './editCreateAccommodation';
import editCreateActivity from './editCreateActivity';
import routes from './routes';

export default combineReducers({
  auth,
  profile,
  events,
  editCreateEvent,
  editCreateTrip,
  editCreateAccommodation,
  editCreateActivity,
  routes,
});
