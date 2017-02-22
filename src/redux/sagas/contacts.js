import { takeLatest, call, put } from 'redux-saga/effects';
import { Actions } from 'react-native-router-flux';
import geocodeAsync from './geocode';
import {
  FETCH_CONTACTS_START,
  FETCH_CONTACTS_SUCCESS,
  FETCH_CONTACTS_ERROR,
  FETCH_FAVORITES_START,
  FETCH_FAVORITES_SUCCESS,
  FETCH_FAVORITES_ERROR,
  ADD_FAVORITE_START,
  ADD_FAVORITE_SUCCESS,
  ADD_FAVORITE_ERROR,
  REMOVE_FAVORITE_START,
  REMOVE_FAVORITE_SUCCESS,
  REMOVE_FAVORITE_ERROR,
  ADD_CONTACT_START,
  ADD_CONTACT_SUCCESS,
  ADD_CONTACT_ERROR,
  REMOVE_CONTACT_START,
  REMOVE_CONTACT_SUCCESS,
  REMOVE_CONTACT_ERROR,
  SEARCH_CONTACTS_START,
  SEARCH_CONTACTS_SUCCESS,
  SEARCH_CONTACTS_ERROR,
  SEARCH_FAVORITES_START,
  SEARCH_FAVORITES_SUCCESS,
  SEARCH_FAVORITES_ERROR,
  GEOCODE_LOCATION_START,
} from '../modules/contacts';
import { AUTHORIZATION_REQUIRED } from '../modules/auth';
import {
  fetchContacts,
  fetchFavorites,
  addContact,
  removeContact,
  addFavorite,
  removeFavorite,
  searchContacts,
  searchFavorites,
} from '../../services/contacts';


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


export function* searchContactsAsync(action) {
  try {
    const { query } = action.payload;
    const response = yield call(searchContacts, query);

    if (response.error) {
      // in case of error
      yield put({
        type: SEARCH_CONTACTS_ERROR,
        payload: {
          result: [],
          error: response.error
        }
      });
    } else {
      // success
      yield put({
        type: SEARCH_CONTACTS_SUCCESS,
        payload: {
          result: response
        }
      });
    }
  } catch (error) {
    console.log({ error });
    yield put({
      type: SEARCH_CONTACTS_ERROR,
      error
    });
  }
}

export function* searchFavoritesAsync(action) {
  try {
    const response = yield call(searchFavorites, action.payload);

    if (response.error) {
      // in case of error
      yield put({
        type: SEARCH_FAVORITES_ERROR,
        payload: {
          result: [],
          error: response.error
        }
      });
    } else {
      // success
      yield put({
        type: SEARCH_FAVORITES_SUCCESS,
        payload: {
          result: response
        }
      });
    }
  } catch (error) {
    console.log({ error });
    yield put({
      type: SEARCH_FAVORITES_ERROR,
      error
    });
  }
}

function* addRemoveRemote({
  action, params, successAction, extraAction, errorAction, successParams
}) {
  try {
    const response = yield call(action, params);
    if (response.error) {
      // in case of error
      yield put({
        type: errorAction,
        payload: {
          error: response.error
        }
      });
    } else {
      // success
      yield put({
        type: successAction,
        payload: successParams,
      });
      if (extraAction) {
        yield put({
          type: extraAction
        });
      }
    }
  } catch (error) {
    console.log({ error });
    yield put({
      type: errorAction,
      error
    });
  }
}

export function* addFavoriteAsync(action) {
  const { contact } = action.payload;
  yield addRemoveRemote({
    action: addFavorite,
    params: contact,
    successParams: { contact },
    successAction: ADD_FAVORITE_SUCCESS,
    extraAction: FETCH_FAVORITES_START,
    errorAction: ADD_FAVORITE_ERROR,
  });
}

export function* addContactAsync(action) {
  const { contact } = action.payload;
  yield addRemoveRemote({
    action: addContact,
    params: contact,
    successParams: { contact },
    successAction: ADD_CONTACT_SUCCESS,
    extraAction: FETCH_CONTACTS_START,
    errorAction: ADD_CONTACT_ERROR,
  });
}

export function* removeFavoriteAsync(action) {
  const { contact } = action.payload;
  yield addRemoveRemote({
    action: removeFavorite,
    params: contact.id,
    successParams: { id: contact.id },
    successAction: REMOVE_FAVORITE_SUCCESS,
    extraAction: FETCH_FAVORITES_START,
    errorAction: REMOVE_FAVORITE_ERROR,
  });
}

export function* removeContactAsync(action) {
  const { contact } = action.payload;
  yield addRemoveRemote({
    action: removeContact,
    params: contact.id,
    successParams: { id: contact.id },
    successAction: REMOVE_CONTACT_SUCCESS,
    extraAction: FETCH_CONTACTS_START,
    errorAction: REMOVE_CONTACT_ERROR,
  });
}

export function* watchFetchContacts() {
  yield takeLatest(FETCH_CONTACTS_START, fetchContactsAsync);
}

export function* watchFetchFavorites() {
  yield takeLatest(FETCH_FAVORITES_START, fetchFavoritesAsync);
}

export function* watchAddFavorite() {
  yield takeLatest(ADD_FAVORITE_START, addFavoriteAsync);
}

export function* watchRemoveFavorite() {
  yield takeLatest(REMOVE_FAVORITE_START, removeFavoriteAsync);
}

export function* watchAddContact() {
  yield takeLatest(ADD_CONTACT_START, addContactAsync);
}

export function* watchRemoveContact() {
  yield takeLatest(REMOVE_CONTACT_START, removeContactAsync);
}

export function* watchSearchContacts() {
  yield takeLatest(SEARCH_CONTACTS_START, searchContactsAsync);
}

export function* watchSearchFavorites() {
  yield takeLatest(SEARCH_FAVORITES_START, searchFavoritesAsync);
}

export function* watchGeocodeSearchFavorites() {
  yield takeLatest(GEOCODE_LOCATION_START, geocodeAsync);
}

