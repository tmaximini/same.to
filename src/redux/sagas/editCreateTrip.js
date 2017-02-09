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
import {
  AUTHORIZATION_REQUIRED,
} from '../modules/auth';
import { createTrip, updateTrip } from '../../services/trips';


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
        yield put({
          type: AUTHORIZATION_REQUIRED
        });
        yield call(Actions.login);
      }
    } else {
      // success
      console.info('trip created!', response);
      yield put({
        type: CREATE_TRIP_SUCCESS,
        payload: {
          trip: response
        }
      });
      yield call(delay, 100);
      yield call(Actions.pop, { refresh: {} });
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
        yield put({
          type: AUTHORIZATION_REQUIRED
        });
        yield call(Actions.login, { type: 'replace' });
      }
    } else {
      // success
      console.info('trip updated!', response);
      yield put({
        type: UPDATE_TRIP_SUCCESS,
        payload: {
          trip: response
        }
      });
      yield call(delay, 100);
      yield call(Actions.pop, { refresh: { trip: response } });
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
