import { delay } from 'redux-saga';
import { takeLatest, call, put } from 'redux-saga/effects';
import { Actions } from 'react-native-router-flux';
import geocodeAsync from './geocode';
import {
  CREATE_ACTIVITY_START,
  CREATE_ACTIVITY_SUCCESS,
  CREATE_ACTIVITY_ERROR,
  GEOCODE_ACTIVITY_START,
  UPDATE_ACTIVITY_START,
  UPDATE_ACTIVITY_SUCCESS,
  UPDATE_ACTIVITY_ERROR,
  DELETE_ACTIVITY_START,
  DELETE_ACTIVITY_SUCCESS,
  DELETE_ACTIVITY_ERROR,
} from '../modules/editCreateActivity';
import {
  FETCH_EVENTS_START
} from '../modules/events';
import {
  AUTHORIZATION_REQUIRED,
} from '../modules/auth';
import {
  createActivity,
  updateActivity,
  deleteActivity,
} from '../../services/activities';


export function* createActivityAsync(action) {
  const { data, eventId } = action.payload;
  try {
    const response = yield call(createActivity, { ...data }, eventId);

    if (response.error) {
      // in case of error
      yield put({
        type: CREATE_ACTIVITY_ERROR,
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
      console.info('activity created!', response);
      yield put({
        type: CREATE_ACTIVITY_SUCCESS,
        payload: {
          activity: response
        }
      });
      yield put({
        type: FETCH_EVENTS_START,
      });
      yield call(delay, 100);
      yield call(Actions.pop, { refresh: {} });
    }
  } catch (error) {
    console.log({ error });
    yield put({
      type: CREATE_ACTIVITY_ERROR,
      error
    });
  }
}


export function* updateActivityAsync(action) {
  const { payload } = action;
  try {
    const response = yield call(updateActivity, { ...payload });

    if (response.error) {
      // in case of error
      yield put({
        type: UPDATE_ACTIVITY_ERROR,
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
      console.info('activity updated!', response);
      yield put({
        type: UPDATE_ACTIVITY_SUCCESS,
        payload: {
          activity: response
        }
      });
      yield call(delay, 100);
      yield call(Actions.pop, { refresh: {} });
    }
  } catch (error) {
    console.log({ error });
    yield put({
      type: UPDATE_ACTIVITY_ERROR,
      error
    });
  }
}


export function* deleteActivityAsync(action) {
  const { payload } = action;
  try {
    const response = yield call(deleteActivity, { ...payload });

    if (response.error) {
      // in case of error
      yield put({
        type: DELETE_ACTIVITY_ERROR,
        payload: {
          error: response.error
        }
      });
    } else {
      // success
      console.info('activity deleted!', response);
      yield put({
        type: DELETE_ACTIVITY_SUCCESS,
        payload: {
          activity: payload
        }
      });
      yield call(delay, 100);
      yield call(Actions.pop, { refresh: {} });
    }
  } catch (error) {
    console.log({ error });
    yield put({
      type: DELETE_ACTIVITY_ERROR,
      error
    });
  }
}


// WATCHERS
export function* watchCreateActivity() {
  yield takeLatest(CREATE_ACTIVITY_START, createActivityAsync);
}

export function* watchUpdateActivity() {
  yield takeLatest(UPDATE_ACTIVITY_START, updateActivityAsync);
}

export function* watchGeocodeActivity() {
  yield takeLatest(GEOCODE_ACTIVITY_START, geocodeAsync);
}

export function* watchDeleteActivity() {
  yield takeLatest(DELETE_ACTIVITY_START, deleteActivityAsync);
}
