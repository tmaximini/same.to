import { takeLatest, call, put } from 'redux-saga/effects';
import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  TOKEN,
  USERID
} from '../modules/auth';
import { NAVIGATE } from '../modules/routes';
import { login as handleLogin } from '../../services/auth';
import { updateAuthHeader } from '../../services/api';
import { multiSet } from '../../services/storage';


/**
 * takes care of logging in a user
 */
export function* handleLoginAsync(action) {
  const { payload } = action;
  try {
    const response = yield call(handleLogin, { ...payload });
    const { id, userId } = response;
    updateAuthHeader(id);
    yield call(multiSet, [[TOKEN, id], [USERID, userId]]);
    yield put({
      type: LOGIN_SUCCESS,
      payload: response
    });
    yield put({
      type: NAVIGATE,
      payload: {
        key: 'home'
      }
    });
  } catch (error) {
    console.error({ error });
    yield put({
      type: LOGIN_ERROR,
      error
    });
  }
}

export function* watchLogin() {
  // spawn new task on each action, cancel the one before if not yet finished
  yield takeLatest(LOGIN_START, handleLoginAsync);
}
