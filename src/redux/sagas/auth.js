import { delay } from 'redux-saga';
import { takeLatest, call, put } from 'redux-saga/effects';
import { Actions } from 'react-native-router-flux';
import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
} from '../modules/auth';
import { login as handleLogin } from '../../services/auth';
import { updateAuthHeader, updateUserId } from '../../services/api';


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


export function* watchLogin() {
  // spawn new task on each action, cancel the one before if not yet finished
  yield takeLatest(LOGIN_START, handleLoginAsync);
}
