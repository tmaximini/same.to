import { delay } from 'redux-saga';
import { takeLatest, call, put } from 'redux-saga/effects';
import { Actions } from 'react-native-router-flux';
import geocodeAsync from './geocode';
import {
  CREATE_EVENT_START,
  CREATE_EVENT_SUCCESS,
  CREATE_EVENT_ERROR,
  GEOCODE_EVENT_START,
} from '../modules/editCreateEvent';
import { updateAuthHeader } from '../../services/api';
import { createEvent } from '../../services/events';


export function* createEventAsync(action) {
  const { payload } = action;
  try {
    const response = yield call(createEvent, { ...payload });

    if (response.error) {
      // in case of error
      yield put({
        type: CREATE_EVENT_ERROR,
        payload: {
          error: response.error
        }
      });
      if (response.error.statusCode === 401) {
        updateAuthHeader(null);
        Actions.login();
      }
    } else {
      // success
      console.info('event created!', response);
      yield put({
        type: CREATE_EVENT_SUCCESS,
        payload: {
          event: response
        }
      });
      yield call(delay, 100);
      yield call(Actions.home);
    }
  } catch (error) {
    console.log({ error });
    yield put({
      type: CREATE_EVENT_ERROR,
      error
    });
  }
}





// WATCHERS
export function* watchCreateEvent() {
  // spawn new task on each action, cancel the one before if not yet finished
  yield takeLatest(CREATE_EVENT_START, createEventAsync);
}

export function* watchGeocodeEvent() {
  yield takeLatest(GEOCODE_EVENT_START, geocodeAsync);
}
