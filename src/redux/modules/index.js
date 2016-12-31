import { combineReducers } from 'redux';
import auth from './auth';
import routes from './routes';
import profile from './profile';
import events from './events';

export default combineReducers({
  auth,
  routes,
  profile,
  events,
});
