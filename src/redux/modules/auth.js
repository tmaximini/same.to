// Initial State
const initialState = {
  loggedIn: false
};


// Constants
export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT = 'LOGOUT';


// Action Creators
export const login = (...data) => ({
  type: LOGIN_START,
  payload: data
});


// Action Handlers
const actionsMap = {
  [LOGIN_SUCCESS]: (state) => Object.assign(state, { loggedIn: true }),
  [LOGIN_ERROR]: (state) => Object.assign(state, {
    loggedIn: false,
    message: 'Login Failed',
  }),
  [LOGOUT]: (state) => Object.assign(state, { loggedIn: false }),
};

// Reducer
export default (state = initialState, action) => {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
};
