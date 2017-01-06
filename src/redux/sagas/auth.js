import { takeLatest, call, put } from 'redux-saga/effects';
import { Actions } from 'react-native-router-flux';
import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
} from '../modules/auth';
import { login as handleLogin } from '../../services/auth';
import { updateAuthHeader } from '../../services/api';


/**
 * takes care of logging in a user
 */
export function* handleLoginAsync(action) {
  const { payload } = action;
  try {
    const response = yield call(handleLogin, { ...payload });
    const { id, error } = response;
    if (error) {
      throw error;
    } else {
      updateAuthHeader(id);
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


export function* watchLogin() {
  // spawn new task on each action, cancel the one before if not yet finished
  yield takeLatest(LOGIN_START, handleLoginAsync);
}
