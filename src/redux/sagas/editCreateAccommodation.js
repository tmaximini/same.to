import { delay } from 'redux-saga';
import { takeLatest, call, put } from 'redux-saga/effects';
import { Actions } from 'react-native-router-flux';
import geocodeAsync from './geocode';
import {
  CREATE_ACCOMMODATION_START,
  CREATE_ACCOMMODATION_SUCCESS,
  CREATE_ACCOMMODATION_ERROR,
  GEOCODE_ACCOMMODATION_START,
  UPDATE_ACCOMMODATION_START,
  UPDATE_ACCOMMODATION_SUCCESS,
  UPDATE_ACCOMMODATION_ERROR,
} from '../modules/editCreateAccommodation';
import {
  AUTHORIZATION_REQUIRED,
} from '../modules/auth';
import { createAccommodation, updateAccommodation } from '../../services/accommodations';


export function* createAccommodationAsync(action) {
  const { data, eventId } = action.payload;
  try {
    const response = yield call(createAccommodation, { ...data }, eventId);

    if (response.error) {
      // in case of error
      yield put({
        type: CREATE_ACCOMMODATION_ERROR,
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
      console.info('accommodation created!', response);
      yield put({
        type: CREATE_ACCOMMODATION_SUCCESS,
        payload: {
          accommodation: response
        }
      });
      yield call(delay, 100);
      yield call(Actions.pop, { refresh: {} });
    }
  } catch (error) {
    console.log({ error });
    yield put({
      type: CREATE_ACCOMMODATION_ERROR,
      error
    });
  }
}


export function* updateAccommodationAsync(action) {
  const { payload } = action;
  try {
    const response = yield call(updateAccommodation, { ...payload });

    if (response.error) {
      // in case of error
      yield put({
        type: UPDATE_ACCOMMODATION_ERROR,
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
      console.info('accommodation updated!', response);
      yield put({
        type: UPDATE_ACCOMMODATION_SUCCESS,
        payload: {
          accommodation: response
        }
      });
      yield call(delay, 100);
      yield call(Actions.pop, { refresh: {} });
    }
  } catch (error) {
    console.log({ error });
    yield put({
      type: UPDATE_ACCOMMODATION_ERROR,
      error
    });
  }
}






// WATCHERS
export function* watchCreateAccommodation() {
  // spawn new task on each action, cancel the one before if not yet finished
  yield takeLatest(CREATE_ACCOMMODATION_START, createAccommodationAsync);
}

export function* watchUpdateAccommodation() {
  yield takeLatest(UPDATE_ACCOMMODATION_START, updateAccommodationAsync);
}

export function* watchGeocodeAccommodation() {
  yield takeLatest(GEOCODE_ACCOMMODATION_START, geocodeAsync);
}
