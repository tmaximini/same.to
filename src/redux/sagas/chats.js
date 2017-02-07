import { takeLatest, call, put } from 'redux-saga/effects';
import { Actions } from 'react-native-router-flux';
import {
  FETCH_CHATS_START,
  FETCH_CHATS_SUCCESS,
  FETCH_CHATS_ERROR,
} from '../modules/chats';
import {
  AUTHORIZATION_REQUIRED,
} from '../modules/auth';
import { fetchChats } from '../../services/chats';


/**
 * takes care of fetching chats
 */
export function* fetchChatsAsync(action) {
  const { payload } = action;
  try {
    const response = yield call(fetchChats, { ...payload });

    if (response.error) {
      // in case of error
      yield put({
        type: FETCH_CHATS_ERROR,
        payload: {
          chats: [],
          error: response.error
        }
      });
      if (response.error.statusCode === 401) {
        yield put({
          type: AUTHORIZATION_REQUIRED
        });
        yield call(Actions.login);
      }
    } else {
      // success
      yield put({
        type: FETCH_CHATS_SUCCESS,
        payload: {
          chats: response
        }
      });
    }
  } catch (error) {
    console.log({ error });
    yield put({
      type: FETCH_CHATS_ERROR,
      error
    });
  }
}

export function* watchFetchChats() {
  // spawn new task on each action, cancel the one before if not yet finished
  yield takeLatest(FETCH_CHATS_START, fetchChatsAsync);
}
