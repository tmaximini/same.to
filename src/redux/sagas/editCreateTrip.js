import { delay } from 'redux-saga';
import { takeLatest, call, put } from 'redux-saga/effects';
import { Actions } from 'react-native-router-flux';
import geocodeAsync from './geocode';
import {
  CREATE_TRIP_START,
  CREATE_TRIP_SUCCESS,
  CREATE_TRIP_ERROR,
  GEOCODE_TRIP_START,
  GEOCODE_TRIP_DESTINATION_START,
  UPDATE_TRIP_START,
  UPDATE_TRIP_SUCCESS,
  UPDATE_TRIP_ERROR,
} from '../modules/editCreateTrip';
import { updateAuthHeader } from '../../services/api';
import { createTrip, updateTrip } from '../../services/trips';


console.log('Actions', Actions);

export function* createTripAsync(action) {
  const { data, eventId } = action.payload;
  try {
    const response = yield call(createTrip, { ...data }, eventId);

    if (response.error) {
      // in case of error
      yield put({
        type: CREATE_TRIP_ERROR,
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
      console.info('trip created!', response);
      yield put({
        type: CREATE_TRIP_SUCCESS,
        payload: {
          event: response
        }
      });
      yield call(delay, 100);
      yield call(Actions.pop);
    }
  } catch (error) {
    console.log({ error });
    yield put({
      type: CREATE_TRIP_ERROR,
      error
    });
  }
}


export function* updateTripAsync(action) {
  const { payload } = action;
  try {
    const response = yield call(updateTrip, { ...payload });

    if (response.error) {
      // in case of error
      yield put({
        type: UPDATE_TRIP_ERROR,
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
      console.info('trip updated!', response);
      yield put({
        type: UPDATE_TRIP_SUCCESS,
        payload: {
          event: response
        }
      });
      yield call(delay, 100);
      yield call(Actions.pop);
    }
  } catch (error) {
    console.log({ error });
    yield put({
      type: UPDATE_TRIP_ERROR,
      error
    });
  }
}






// WATCHERS
export function* watchCreateTrip() {
  // spawn new task on each action, cancel the one before if not yet finished
  yield takeLatest(CREATE_TRIP_START, createTripAsync);
}

export function* watchUpdateTrip() {
  yield takeLatest(UPDATE_TRIP_START, updateTripAsync);
}

export function* watchGeocodeTrip() {
  yield takeLatest(GEOCODE_TRIP_START, geocodeAsync);
}

export function* watchGeocodeTripDestination() {
  yield takeLatest(GEOCODE_TRIP_DESTINATION_START, geocodeAsync);
}
