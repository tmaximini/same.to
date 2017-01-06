import { takeLatest, call, put } from 'redux-saga/effects';
import { Actions } from 'react-native-router-flux';
import {
  FETCH_EVENTS_START,
  FETCH_EVENTS_SUCCESS,
  FETCH_EVENTS_ERROR,
} from '../modules/events';
import { updateAuthHeader } from '../../services/api';
import { fetchEvents } from '../../services/events';
// import { multiSet } from '../../services/storage';


/**
 * takes care of logging in a user
 */
export function* fetchEventsAsync(action) {
  const { payload } = action;
  try {
    const response = yield call(fetchEvents, { ...payload });

    if (response.error) {
      // in case of error
      yield put({
        type: FETCH_EVENTS_ERROR,
        payload: {
          events: [],
          error: response.error
        }
      });
      if (response.error.statusCode === 401) {
        updateAuthHeader(null);
        Actions.login();
      }
    } else {
      // success
      yield put({
        type: FETCH_EVENTS_SUCCESS,
        payload: {
          events: response
        }
      });
    }
  } catch (error) {
    console.error({ error });
    yield put({
      type: FETCH_EVENTS_ERROR,
      error
    });
  }
}

export function* watchFetchEvents() {
  // spawn new task on each action, cancel the one before if not yet finished
  yield takeLatest(FETCH_EVENTS_START, fetchEventsAsync);
}
