import { combineReducers } from 'redux';
import auth from './auth';
import editCreateProfile from './editCreateProfile';
import events from './events';
import chats from './chats';
import contacts from './contacts';
import detail from './detail';
import editCreateEvent from './editCreateEvent';
import editCreateTrip from './editCreateTrip';
import editCreateAccommodation from './editCreateAccommodation';
import editCreateActivity from './editCreateActivity';
import routes from './routes';

export default combineReducers({
  auth,
  editCreateProfile,
  events,
  chats,
  contacts,
  detail,
  editCreateEvent,
  editCreateTrip,
  editCreateAccommodation,
  editCreateActivity,
  routes,
});
