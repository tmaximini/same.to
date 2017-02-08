import DeviceInfo from 'react-native-device-info';
import { REHYDRATE } from 'redux-persist/constants';
import { updateAuthHeader, updateUserId } from '../../services/api';
import { purgeOfflineStorage } from '../configureStore';


// Initial State
const initialState = {
  loggedIn: false,
  email: 'peter.limbach@example.org',
  password: null,
  username: null,
  isLoading: false,
  token: null,
  userId: null,
  error: null,
  rehydrateFinished: false,
  facebook: {},
  deviceId: DeviceInfo.getUniqueID(),
};


// Constants (Actions)
export const REGISTER_START = 'auth/REGISTER_START';
export const REGISTER_SUCCESS = 'auth/REGISTER_SUCCESS';
export const REGISTER_ERROR = 'auth/REGISTER_ERROR';
export const LOGIN_START = 'auth/LOGIN_START';
export const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
export const LOGIN_ERROR = 'auth/LOGIN_ERROR';
export const FACEBOOK_LOGIN_START = 'auth/FACEBOOK_LOGIN_START';
export const FACEBOOK_LOGIN_SUCCESS = 'auth/FACEBOOK_LOGIN_SUCCESS';
export const FACEBOOK_LOGIN_ERROR = 'auth/FACEBOOK_LOGIN_ERROR';
export const LOGOUT = 'auth/LOGOUT';
export const UPDATE = 'auth/UPDATE';
export const AUTHORIZATION_REQUIRED = 'auth/AUTHORIZATION_REQUIRED';
// storage keys
// export const TOKEN = '@@SAME/TOKEN';
// export const USERID = '@@SAME/USERID';


// Action Creators
export const register = data => ({
  type: REGISTER_START,
  payload: {
    ...data
  }
});

export const login = ({ email, password }) => ({
  type: LOGIN_START,
  payload: {
    email,
    password,
  }
});

export const facebookLogin = ({ access_token }) => ({
  type: FACEBOOK_LOGIN_START,
  payload: {
    access_token,
  }
});

// updates any key/value pair in the state
export const update = (key, value) => ({
  type: UPDATE,
  payload: {
    key,
    value,
  }
});

export const resetErrors = () => ({
  type: UPDATE,
  payload: {
    key: 'error',
    value: null,
  }
});


// export all actions
export const actions = {
  login,
  facebookLogin,
  update,
  register,
  resetErrors
};


// Action Handlers
const actionsMap = {
  [REHYDRATE]: (state, action) => {
    console.info('REHYDRATE!!', state);
    if (action.payload.auth) {
      try {
        const { token, loggedIn, userId } = action.payload.auth;
        if (loggedIn && token) {
          updateAuthHeader(token);
          updateUserId(userId);
        }
      } catch (e) {
        console.warn(e);
      }
    }

    return { ...state, ...action.payload.auth, rehydrateFinished: true };
  },
  [LOGIN_START]: (state) => ({
    ...state,
    isLoading: true,
  }),
  [AUTHORIZATION_REQUIRED]: () => {
    updateAuthHeader(null); // reset auth token
    purgeOfflineStorage(); // reset offline data
    // reset state
    return {
      ...initialState
    };
  },
  [LOGIN_SUCCESS]: (state, action) => {
    const { userId, id } = action.payload;

    return {
      ...state,
      loggedIn: true,
      userId,
      token: id,
      error: null,
      password: null,
      isLoading: false,
    };
  },
  [FACEBOOK_LOGIN_SUCCESS]: (state, action) => {
    const { userId, access_token } = action.payload;

    return {
      ...state,
      loggedIn: true,
      userId,
      token: access_token,
      error: null,
      password: null,
      // isLoading: false,
    };
  },
  [REGISTER_SUCCESS]: (state, action) => {
    const { id, token } = action.payload;

    return {
      ...state,
      loggedIn: true,
      userId: id,
      token,
      error: null,
      password: null,
      isLoading: false,
    };
  },
  [LOGIN_ERROR]: state => ({
    ...state,
    loggedIn: false,
    error: 'Login Failed',
    isLoading: false,
  }),
  [LOGOUT]: state => ({ ...state, loggedIn: false, isLoading: false }),
  [UPDATE]: (state, action) => ({ ...state, [action.payload.key]: action.payload.value }),
};


// Reducer
export default (state = initialState, action) => {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
};
