import { delay } from 'redux-saga';
import { takeLatest, call, put } from 'redux-saga/effects';
import { Actions } from 'react-native-router-flux';
import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  FACEBOOK_LOGIN_START,
  FACEBOOK_LOGIN_SUCCESS,
  REGISTER_START,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
} from '../modules/auth';
import { SET_PROFILE } from '../modules/editCreateProfile';
import {
  login as handleLogin,
  loginFacebook as handleLoginFacebook,
  register as handleRegister,
} from '../../services/auth';
import { updateAuthHeader, updateUserId } from '../../services/api';
import { getProfile } from '../../services/profiles';


/**
 * takes care of logging in a user
 */
export function* handleLoginAsync(action) {
  const { payload } = action;
  try {
    const response = yield call(handleLogin, { ...payload });
    const { id, userId, error } = response;
    if (error) {
      throw error;
    } else {
      updateAuthHeader(id);
      updateUserId(userId);
      yield put({
        type: LOGIN_SUCCESS,
        payload: response,
      });
      yield call(delay, 100);
      yield call(Actions.tabbar, { key: 'tabbar', type: 'replace' });
      yield call(Actions.home, { type: 'replace' });
    }
  } catch (error) {
    console.info({ error });
    yield put({
      type: LOGIN_ERROR,
      error
    });
    yield call(Actions.login);
  }
}

export function* handleFBLoginAsync(action) {
  const { payload } = action;
  console.log('payload', payload);
  try {
    const response = yield call(handleLoginFacebook, { ...payload });
    const { access_token, userId, error } = response;
    if (error || (typeof response === 'string' && /error/.test(response))) {
      throw error;
    } else {
      updateAuthHeader(access_token);
      updateUserId(userId);
      yield put({
        type: FACEBOOK_LOGIN_SUCCESS,
        payload: response,
      });
      // yield call(delay, 100);

      /**
       * here we need to decide wheter to send user to home or to profile / intro
       * depending on api response (signupCompleted?)
       */
      const profile = yield call(getProfile);
      console.log('profile', profile);
      yield put({
        type: SET_PROFILE,
        payload: {
          model: profile
        },
      });
      if (profile.signupCompleted) {
        yield call(Actions.tabbar, { key: 'tabbar', type: 'replace' });
        yield call(Actions.home, { type: 'replace' });
      } else {
        yield call(Actions.editCreateProfile, { type: 'replace', profile });
      }
    }
  } catch (error) {
    console.info({ error });
    yield put({
      type: LOGIN_ERROR,
      error
    });
    yield call(Actions.login);
  }
}

export function* handleRegisterAsync(action) {
  const { payload } = action;
  try {
    const response = yield call(handleRegister, { ...payload });
    const { id, token, error } = response;
    if (error) {
      throw error;
    } else {
      updateAuthHeader(token);
      updateUserId(id);
      yield put({
        type: REGISTER_SUCCESS,
        payload: response,
      });
      yield call(delay, 100);
      yield call(Actions.editCreateProfile, { type: 'reset' });
    }
  } catch (error) {
    console.info({ error });
    yield put({
      type: REGISTER_ERROR,
      error
    });
    yield call(Actions.login);
  }
}


export function* watchLogin() {
  // spawn new task on each action, cancel the one before if not yet finished
  yield takeLatest(LOGIN_START, handleLoginAsync);
}

export function* watchFBLogin() {
  // spawn new task on each action, cancel the one before if not yet finished
  yield takeLatest(FACEBOOK_LOGIN_START, handleFBLoginAsync);
}

export function* watchRegister() {
  yield takeLatest(REGISTER_START, handleRegisterAsync);
}
