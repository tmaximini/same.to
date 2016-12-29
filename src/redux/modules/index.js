import { combineReducers } from 'redux';
import auth from './auth';
import routes from './routes';
import profile from './profile';

export default combineReducers({
  auth,
  routes,
  profile,
});
