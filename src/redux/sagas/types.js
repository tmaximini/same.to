import { takeLatest, call, put } from 'redux-saga/effects';

import {
  GET_ACTIVITY_TYPES_START,
  GET_ACTIVITY_TYPES_SUCCESS,
  GET_ACTIVITY_TYPES_ERROR,
} from '../modules/editCreateActivity';
import {
  GET_ACCOMMODATION_TYPES_START,
  GET_ACCOMMODATION_TYPES_SUCCESS,
  GET_ACCOMMODATION_TYPES_ERROR,
} from '../modules/editCreateAccommodation';
import {
  GET_TRIP_TYPES_START,
  GET_TRIP_TYPES_SUCCESS,
  GET_TRIP_TYPES_ERROR,
} from '../modules/editCreateTrip';

import {
  getAccommodationTypes,
  getActivityTypes,
  getTripTypes,
} from '../../services/types';

export default function* fetchTypes({ action, successAction, errorAction, }) {
  try {
    const response = yield call(action);
    if (response.error) {
      // in case of error
      yield put({
        type: errorAction,
        payload: {
          error: response.error ? response.error : response,
        }
      });
    } else {
      // success
      yield put({
        type: successAction,
        payload: response
      });
    }
  } catch (error) {
    console.log({ error });
    yield put({
      type: errorAction,
      payload: {
        error: error.code || error.message,
        location
      }
    });
  }
}

export function* fetchTripTypesAsync() {
  yield fetchTypes({
    action: getTripTypes,
    successAction: GET_TRIP_TYPES_SUCCESS,
    errorAction: GET_TRIP_TYPES_ERROR,
  });
}

export function* fetchAccommodationTypesAsync() {
  yield fetchTypes({
    action: getAccommodationTypes,
    successAction: GET_ACCOMMODATION_TYPES_SUCCESS,
    errorAction: GET_ACCOMMODATION_TYPES_ERROR,
  });
}

export function* fetchActivityTypesAsync() {
  yield fetchTypes({
    action: getActivityTypes,
    successAction: GET_ACTIVITY_TYPES_SUCCESS,
    errorAction: GET_ACTIVITY_TYPES_ERROR,
  });
}

export function* watchFetchAccommodationTypes() {
  yield takeLatest(GET_ACCOMMODATION_TYPES_START, fetchAccommodationTypesAsync);
}

export function* watchFetchTripTypes() {
  yield takeLatest(GET_TRIP_TYPES_START, fetchTripTypesAsync);
}

export function* watchFetchActivityTypes() {
  yield takeLatest(GET_ACTIVITY_TYPES_START, fetchActivityTypesAsync);
}
