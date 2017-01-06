// Initial State
const initialState = {
  loggedIn: false,
  email: 'peter.limbach@example.org',
  password: null,
  isLoading: false,
  token: null,
  userId: null,
  error: null
};


// Constants (Actions)
export const LOGIN_START = 'auth/LOGIN_START';
export const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
export const LOGIN_ERROR = 'auth/LOGIN_ERROR';
export const LOGOUT = 'auth/LOGOUT';
export const UPDATE = 'auth/UPDATE';
export const MULTI_UPDATE = 'auth/MULTI_UPDATE';
export const CHECK_AUTH_STORAGE = 'auth/CHECK_AUTH_STORAGE';
// storage keys
export const TOKEN = '@@SAME/TOKEN';
export const USERID = '@@SAME/USERID';


// Action Creators
export const login = ({ email, password }) => ({
  type: LOGIN_START,
  payload: {
    email,
    password,
  }
});

export const checkStorage = () => ({
  type: CHECK_AUTH_STORAGE,
});


// updates any key/value pair in the state
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
  checkStorage,
};


// Action Handlers
const actionsMap = {
  [LOGIN_SUCCESS]: (state, action) => {
    const { userId, id } = action.payload;

    return {
      ...state,
      loggedIn: true,
      userId,
      token: id,
      error: null
    };
  },
  [LOGIN_ERROR]: (state, action) => ({
    ...state,
    loggedIn: false,
    error: 'Login Failed',
  }),
  [LOGOUT]: state => ({ ...state, loggedIn: false }),
  [UPDATE]: (state, action) => ({ ...state, [action.payload.key]: action.payload.value }),
  [MULTI_UPDATE]: (state, action) => ({ ...state, ...action.payload })
};


// Reducer
export default (state = initialState, action) => {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
};
