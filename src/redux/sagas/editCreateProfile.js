import { delay } from 'redux-saga';
import { takeLatest, call, put } from 'redux-saga/effects';
import { Actions } from 'react-native-router-flux';
import geocodeAsync from './geocode';
import {
  CREATE_PROFILE_START,
  CREATE_PROFILE_SUCCESS,
  CREATE_PROFILE_ERROR,
  GEOCODE_PROFILE_START,
  UPDATE_PROFILE_START,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_ERROR,
  FETCH_PROFILE_START,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_ERROR,
} from '../modules/editCreateProfile';
import {
  AUTHORIZATION_REQUIRED,
} from '../modules/auth';
import { createProfile, updateProfile, getProfile } from '../../services/profiles';


export function* createProfileAsync(action) {
  const { payload } = action;
  try {
    const response = yield call(createProfile, { ...payload });

    if (response.error) {
      // in case of error
      yield put({
        type: CREATE_PROFILE_ERROR,
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
      console.info('profile created!', response);
      yield put({
        type: CREATE_PROFILE_SUCCESS,
        payload: {
          profile: response
        }
      });
      yield call(delay, 100);
      yield call(Actions.pop, { refresh: {} });
    }
  } catch (error) {
    console.log({ error });
    yield put({
      type: CREATE_PROFILE_ERROR,
      error
    });
  }
}


export function* updateProfileAsync(action) {
  const { payload } = action;
  // check signupCompleted BEFORE updating the profile
  const { signupCompleted } = payload;
  try {
    const response = yield call(updateProfile, { ...payload });

    if (response.error) {
      // in case of error
      yield put({
        type: UPDATE_PROFILE_ERROR,
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
      console.info('profile updated!', response);
      yield put({
        type: UPDATE_PROFILE_SUCCESS,
        payload: {
          profile: response
        }
      });

      if (signupCompleted) {
        // user came from settings
        yield call(Actions.pop, { refresh: {} });
      } else {
        // first time user, send to onBoarding
        // yield call(Actions.tabbar, { key: 'tabbar', type: 'replace' });
        yield call(Actions.onboarding1);
      }
    }
  } catch (error) {
    console.log({ error });
    yield put({
      type: UPDATE_PROFILE_ERROR,
      error
    });
  }
}


export function* fetchProfileAsync() {
  try {
    const response = yield call(getProfile);

    if (response.error) {
      // in case of error
      yield put({
        type: FETCH_PROFILE_ERROR,
        payload: {
          error: response.error
        }
      });
    } else {
      // success
      yield put({
        type: FETCH_PROFILE_SUCCESS,
        payload: {
          profile: response
        }
      });
    }
  } catch (error) {
    console.log({ error });
    yield put({
      type: FETCH_PROFILE_ERROR,
      error
    });
  }
}



// WATCHERS
export function* watchCreateProfile() {
  // spawn new task on each action, cancel the one before if not yet finished
  yield takeLatest(CREATE_PROFILE_START, createProfileAsync);
}

export function* watchUpdateProfile() {
  yield takeLatest(UPDATE_PROFILE_START, updateProfileAsync);
}

export function* watchGeocodeProfile() {
  yield takeLatest(GEOCODE_PROFILE_START, geocodeAsync);
}

export function* watchFetchProfile() {
  yield takeLatest(FETCH_PROFILE_START, fetchProfileAsync);
}
