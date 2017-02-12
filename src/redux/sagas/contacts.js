import { takeLatest, call, put } from 'redux-saga/effects';
import { Actions } from 'react-native-router-flux';
import {
  FETCH_CONTACTS_START,
  FETCH_CONTACTS_SUCCESS,
  FETCH_CONTACTS_ERROR,
  FETCH_FAVORITES_START,
  FETCH_FAVORITES_SUCCESS,
  FETCH_FAVORITES_ERROR,
} from '../modules/contacts';
import { AUTHORIZATION_REQUIRED } from '../modules/auth';
import { updateAuthHeader } from '../../services/api';
import { fetchContacts, fetchFavorites } from '../../services/contacts';


/**
 * takes care of fetching contacts
 */
export function* fetchContactsAsync(action) {
  const { payload } = action;
  try {
    const response = yield call(fetchContacts, { ...payload });

    if (response.error) {
      // in case of error
      yield put({
        type: FETCH_CONTACTS_ERROR,
        payload: {
          contacts: [],
          error: response.error
        }
      });
      if (response.error.statusCode === 401) {
        yield put({
          type: AUTHORIZATION_REQUIRED
        });
        yield call(Actions.login, { type: 'reset' });
      }
    } else {
      // success
      yield put({
        type: FETCH_CONTACTS_SUCCESS,
        payload: {
          contacts: response
        }
      });
    }
  } catch (error) {
    console.log({ error });
    yield put({
      type: FETCH_CONTACTS_ERROR,
      error
    });
  }
}

export function* fetchFavoritesAsync() {
  try {
    const response = yield call(fetchFavorites);

    if (response.error) {
      // in case of error
      yield put({
        type: FETCH_FAVORITES_ERROR,
        payload: {
          favorites: [],
          error: response.error
        }
      });
      if (response.error.statusCode === 401) {
        yield put({
          type: AUTHORIZATION_REQUIRED
        });
        yield call(Actions.login, { type: 'reset' });
      }
    } else {
      // success
      yield put({
        type: FETCH_FAVORITES_SUCCESS,
        payload: {
          favorites: response
        }
      });
    }
  } catch (error) {
    console.log({ error });
    yield put({
      type: FETCH_FAVORITES_ERROR,
      error
    });
  }
}

export function* watchFetchContacts() {
  // spawn new task on each action, cancel the one before if not yet finished
  yield takeLatest(FETCH_CONTACTS_START, fetchContactsAsync);
}

export function* watchFetchFavorites() {
  // spawn new task on each action, cancel the one before if not yet finished
  yield takeLatest(FETCH_FAVORITES_START, fetchFavoritesAsync);
}
