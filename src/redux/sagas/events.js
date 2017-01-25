import { takeLatest, call, put } from 'redux-saga/effects';
import { Actions } from 'react-native-router-flux';
import {
  FETCH_EVENTS_START,
  FETCH_EVENTS_SUCCESS,
  FETCH_EVENTS_ERROR,
} from '../modules/events';
import {
  AUTHORIZATION_REQUIRED,
} from '../modules/auth';
import { fetchEvents } from '../../services/events';


/**
 * takes care of fetching events
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
        yield put({
          type: AUTHORIZATION_REQUIRED
        });
        yield call(Actions.login);
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
    console.log({ error });
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
