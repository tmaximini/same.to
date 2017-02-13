import { takeLatest, call, put } from 'redux-saga/effects';
import { Actions } from 'react-native-router-flux';
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
} from '../modules/contacts';
import { AUTHORIZATION_REQUIRED } from '../modules/auth';
import {
  fetchContacts,
  fetchFavorites,
  addContact,
  removeContact,
  addFavorite,
  removeFavorite,
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

function* addRemoveRemote({ action, params, successAction, errorAction }) {
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
        payload: {
          contact: response
        }
      });
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
    successAction: ADD_FAVORITE_SUCCESS,
    errorAction: ADD_FAVORITE_ERROR,
  });
}

export function* addContactAsync(action) {
  const { contact } = action.payload;
  yield addRemoveRemote({
    action: addContact,
    params: contact,
    successAction: ADD_CONTACT_SUCCESS,
    errorAction: ADD_CONTACT_ERROR,
  });
}

export function* removeFavoriteAsync(action) {
  const { contact } = action.payload;
  yield addRemoveRemote({
    action: removeFavorite,
    params: contact.id,
    successAction: REMOVE_FAVORITE_SUCCESS,
    errorAction: REMOVE_FAVORITE_ERROR,
  });
}

export function* removeContactAsync(action) {
  const { contact } = action.payload;
  yield addRemoveRemote({
    action: removeContact,
    params: contact.id,
    successAction: REMOVE_CONTACT_SUCCESS,
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
