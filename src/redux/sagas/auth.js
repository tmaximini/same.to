import { takeLatest, call, put } from 'redux-saga/effects';
import { LOGIN_START, LOGIN_SUCCESS, LOGIN_ERROR } from '../modules/auth';
import { login as handleLogin } from '../../services/auth';

/**
 * takes care of logging in a user
 */
export function* handleLoginAsync(action) {
  const { payload } = action;
  try {
    const response = yield call(handleLogin, { ...payload });
    console.log({ response });
    yield put({
      type: LOGIN_SUCCESS,
      response
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
