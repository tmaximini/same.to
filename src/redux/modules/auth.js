import { login as handleLogin } from '../../services/auth';

// Initial State
const initialState = {
  loggedIn: false,
  username: null,
  password: null,
  isLoading: false,
};


// Constants
export const LOGIN_START = 'auth/LOGIN_START';
export const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
export const LOGIN_ERROR = 'auth/LOGIN_ERROR';
export const LOGOUT = 'auth/LOGOUT';
export const UPDATE = 'auth/UPDATE';


// Action Creators
export function login(email, password) {
  return (dispatch) => {
    dispatch(LOGIN_START);
    handleLogin(email, password)
      .then(data => {
        console.info(data);
        dispatch(LOGIN_SUCCESS, data);
      })
      .catch(e => {
        console.error(e);
        dispatch(LOGIN_ERROR);
      });
  };
}

export const update = (key, value) => ({
  type: UPDATE,
  payload: {
    key,
    value,
  }
});


// export all actions
export const actions = {
  login,
  update,
};


// Action Handlers
const actionsMap = {
  [LOGIN_SUCCESS]: (state) => Object.assign(state, { loggedIn: true }),
  [LOGIN_ERROR]: (state) => Object.assign(state, {
    loggedIn: false,
    message: 'Login Failed',
  }),
  [LOGOUT]: (state) => Object.assign(state, { loggedIn: false }),
  [UPDATE]: (state, action) => Object.assign(state, { [action.payload.key]: action.payload.value }),
};


// Reducer
export default (state = initialState, action) => {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
};
