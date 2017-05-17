import { takeLatest, call, put } from 'redux-saga/effects';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';
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
  ACCEPT_START,
  ACCEPT_SUCCESS,
  ACCEPT_ERROR,
  DECLINE_START,
  DECLINE_SUCCESS,
  DECLINE_ERROR,
  REMOVE_CONTACT_START,
  REMOVE_CONTACT_SUCCESS,
  REMOVE_CONTACT_ERROR,
  SEARCH_CONTACTS_START,
  SEARCH_CONTACTS_SUCCESS,
  SEARCH_CONTACTS_ERROR,
  SEARCH_FAVORITES_START,
  SEARCH_FAVORITES_SUCCESS,
  SEARCH_FAVORITES_ERROR,
  GEOCODE_LOCATION_START
} from '../modules/contacts';
import { AUTHORIZATION_REQUIRED } from '../modules/auth';
import { FETCH_EVENTS_START } from '../modules/events';
import { FETCH_PROFILE_START } from '../modules/editCreateProfile';
import {
  fetchContacts,
  fetchFavorites,
  addContact,
  acceptContact,
  declineContact,
  removeContact,
  addFavorite,
  removeFavorite,
  searchContacts,
  searchFavorites
} from '../../services/contacts';

// const DUMMY = [{"firstName":"thomas","lastName":"mxm","gender":"male","location":{"position":{"lat":52.3720683,"lng":9.7356861},"formattedAddress":"Hannover, Deutschland","feature":null,"streetNumber":null,"streetName":null,"postalCode":null,"locality":"Hannover","country":"Deutschland","countryCode":"DE","adminArea":"Niedersachsen","subAdminArea":"Region Hannover","subLocality":null,"id":null},"interests":[],"occupation":null,"company":null,"signupCompleted":true,"username":null,"id":"58ab71fb2e21c5d33280dcaf","deviceId":"D61D68F1-5BBE-457F-B4D7-0C927209DA35","avatar":null,"uploadedImage":null,"token":"ICdmDLfKyPGu5EdddY1nGfUlgtqP0491gpDtVRO6wkhFGGyAI52YuHC6zocwMvWS","ttl":1209600,"image":{"url":"https://same.wearekiai.de/contents/58ab724f2e21c5d33280dcb0.JPG","thumbs":{"100x100":"https://same.wearekiai.de/contents/58ab724f2e21c5d33280dcb0.JPG?dim=100x100","320x320":"https://same.wearekiai.de/contents/58ab724f2e21c5d33280dcb0.JPG?dim=320x320","720x720":"https://same.wearekiai.de/contents/58ab724f2e21c5d33280dcb0.JPG?dim=720x720"}},"isContact":false,"isFavorite":true},{"firstName":"Christian","lastName":"Neubauer","gender":"male","location":{"position":{"lat":50.3566962,"lng":7.5996166},"formattedAddress":"Koblenz, Deutschland","feature":null,"streetNumber":null,"streetName":null,"postalCode":null,"locality":"Koblenz","country":"Deutschland","countryCode":"DE","adminArea":"Rheinland-Pfalz","subAdminArea":"Koblenz","subLocality":null,"id":null},"interests":["Startups","Online Marketing","Streetfood","Snowboarden","Reisen","Basketball",""],"occupation":"CEO & Founder","company":"SAME","signupCompleted":true,"username":null,"id":"58a89455fec4af3816626cbd","deviceId":"7FF1C244-2DAD-4A4B-B637-A3FFD46FC805","image":{"url":"https://same.wearekiai.de/contents/58a8b602b00a4be63af61e64.JPG","thumbs":{"100x100":"https://same.wearekiai.de/contents/58a8b602b00a4be63af61e64.JPG?dim=100x100","320x320":"https://same.wearekiai.de/contents/58a8b602b00a4be63af61e64.JPG?dim=320x320","720x720":"https://same.wearekiai.de/contents/58a8b602b00a4be63af61e64.JPG?dim=720x720"}},"isContact":true,"isFavorite":true},{"firstName":"Thomas","lastName":"Mxmni","gender":"male","location":{"position":{"lat":52.5234051,"lng":13.4113999},"formattedAddress":"Berlin, Deutschland","feature":null,"streetNumber":null,"streetName":null,"postalCode":null,"locality":"Berlin","country":"Deutschland","countryCode":"DE","adminArea":"Berlin","subAdminArea":"Berlin","subLocality":null,"id":null},"signupCompleted":true,"username":"facebook-token.866412756834059","id":"58a57ba520a836e92c9f776a","image":{"url":"https://graph.facebook.com/v2.6/866412756834059/picture?type=square&width=720","thumbs":{"100x100":"https://graph.facebook.com/v2.6/866412756834059/picture?type=square&width=100","320x320":"https://graph.facebook.com/v2.6/866412756834059/picture?type=square&width=320","720x720":"https://graph.facebook.com/v2.6/866412756834059/picture?type=square&width=720"}},"isContact":true,"isFavorite":true}];

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

export function* acceptContactAsync(action) {
  try {
    const response = yield call(acceptContact, action.payload.member);

    if (response.error) {
      // in case of error
      yield put({
        type: ACCEPT_ERROR,
        payload: {
          favorites: [],
          error: response.error
        }
      });
    } else {
      // success
      yield put({
        type: ACCEPT_SUCCESS
      });
      yield put({
        type: FETCH_PROFILE_START
      });
    }
  } catch (error) {
    console.log({ error });
    yield put({
      type: ACCEPT_ERROR,
      error
    });
  }
}

export function* declineContactAsync(action) {
  try {
    const response = yield call(declineContact, action.payload.member);

    if (response.error) {
      // in case of error
      yield put({
        type: DECLINE_ERROR,
        payload: {
          favorites: [],
          error: response.error
        }
      });
    } else {
      // success
      yield put({
        type: DECLINE_SUCCESS
      });
      yield put({
        type: FETCH_PROFILE_START
      });
    }
  } catch (error) {
    console.log({ error });
    yield put({
      type: DECLINE_ERROR,
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
  action,
  params,
  successAction,
  extraActions,
  errorAction,
  successParams
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
        payload: successParams
      });
      if (_.isArray(extraActions) && extraActions.length > 0) {
        for (let i = 0; i < extraActions.length; i++) {
          yield put({
            type: extraActions[i]
          });
        }
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
    extraActions: [
      FETCH_FAVORITES_START,
      FETCH_EVENTS_START,
      FETCH_PROFILE_START
    ],
    errorAction: ADD_FAVORITE_ERROR
  });
}

export function* addContactAsync(action) {
  const { contact } = action.payload;
  yield addRemoveRemote({
    action: addContact,
    params: contact,
    successParams: { contact },
    successAction: ADD_CONTACT_SUCCESS,
    extraActions: [
      FETCH_FAVORITES_START,
      FETCH_EVENTS_START,
      FETCH_PROFILE_START
    ],
    errorAction: ADD_CONTACT_ERROR
  });
}

export function* removeFavoriteAsync(action) {
  const { contact } = action.payload;
  yield addRemoveRemote({
    action: removeFavorite,
    params: contact.id,
    successParams: { id: contact.id },
    successAction: REMOVE_FAVORITE_SUCCESS,
    extraActions: [
      FETCH_FAVORITES_START,
      FETCH_EVENTS_START,
      FETCH_PROFILE_START
    ],
    errorAction: REMOVE_FAVORITE_ERROR
  });
}

export function* removeContactAsync(action) {
  const { contact } = action.payload;
  yield addRemoveRemote({
    action: removeContact,
    params: contact.id,
    successParams: { id: contact.id },
    successAction: REMOVE_CONTACT_SUCCESS,
    extraActions: [
      FETCH_FAVORITES_START,
      FETCH_EVENTS_START,
      FETCH_PROFILE_START
    ],
    errorAction: REMOVE_CONTACT_ERROR
  });
}

export function* watchFetchContacts() {
  yield takeLatest(FETCH_CONTACTS_START, fetchContactsAsync);
}

export function* watchAcceptContact() {
  yield takeLatest(ACCEPT_START, acceptContactAsync);
}

export function* watchDeclineContact() {
  yield takeLatest(DECLINE_START, declineContactAsync);
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
