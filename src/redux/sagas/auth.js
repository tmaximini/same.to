import { takeLatest, call, put } from 'redux-saga/effects';
import { Actions } from 'react-native-router-flux';
import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  CHECK_AUTH_STORAGE,
  MULTI_UPDATE,
  TOKEN,
  USERID
} from '../modules/auth';
import { login as handleLogin } from '../../services/auth';
import { updateAuthHeader } from '../../services/api';
import { multiSet, multiGet } from '../../services/storage';




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
      yield call(multiSet, [[TOKEN, id], [USERID, userId]]);
      yield put({
        type: LOGIN_SUCCESS,
        payload: response,
      });
      yield call(Actions.home);
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


export function* updateFromStorageAsync() {
  try {
    const stores = yield call(multiGet, [TOKEN, USERID]);
    const authState = {
      token: stores[0][1],
      userId: stores[1][1],
      loggedIn: true
    };
    if (authState.token && authState.userId) {
      updateAuthHeader(authState.token);
      yield put({
        type: MULTI_UPDATE,
        payload: authState,
      });
      yield call(Actions.home);
    }
  } catch (err) {
    // todo
  }
}


export function* watchLogin() {
  // spawn new task on each action, cancel the one before if not yet finished
  yield takeLatest(LOGIN_START, handleLoginAsync);
}

export function* watchAuthStorage() {
  yield takeLatest(CHECK_AUTH_STORAGE, updateFromStorageAsync);
}
