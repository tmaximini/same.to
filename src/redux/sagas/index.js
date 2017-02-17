// import { fork } from 'redux-saga/effects';
// SAGAs
// 1. define worker sagas
// 2. define watcher sagas
// 3. define root saga as single point of entry to start all sagas at once

import {
  watchLogin,
  watchFBLogin,
  watchRegister,
} from './auth';
import {
  watchFetchEvents,
  watchParticipateEvent,
  watchSearchEvents,
} from './events';
import {
  watchFetchContacts,
  watchFetchFavorites,
  watchAddContact,
  watchRemoveContact,
  watchAddFavorite,
  watchRemoveFavorite,
  watchSearchContacts,
} from './contacts';
import {
  watchCreateEvent,
  watchUpdateEvent,
  watchGeocodeEvent,
} from './editCreateEvent';
import {
  watchCreateTrip,
  watchUpdateTrip,
  watchGeocodeTrip,
  watchGeocodeTripDestination,
} from './editCreateTrip';
import {
  watchCreateAccommodation,
  watchUpdateAccommodation,
  watchGeocodeAccommodation,
} from './editCreateAccommodation';
import {
  watchCreateActivity,
  watchUpdateActivity,
  watchGeocodeActivity,
} from './editCreateActivity';
import {
  watchCreateProfile,
  watchUpdateProfile,
  watchGeocodeProfile,
  watchFetchProfile,
} from './editCreateProfile';
import {
  watchToggleParticipate,
} from './detail';
import {
  watchFetchChats,
  watchCreateChat,
  watchUpdateChat,
} from './chats';

/*
 * The entry point for all the sagas used in this application.
 */
export default function* root() {
  yield [
    watchLogin(),
    watchFBLogin(),
    watchRegister(),
    watchFetchEvents(),
    watchSearchEvents(),
    watchParticipateEvent(),
    watchFetchContacts(),
    watchFetchFavorites(),
    watchAddContact(),
    watchRemoveContact(),
    watchAddFavorite(),
    watchRemoveFavorite(),
    watchSearchContacts(),
    watchCreateEvent(),
    watchUpdateEvent(),
    watchGeocodeEvent(),
    watchCreateTrip(),
    watchUpdateTrip(),
    watchGeocodeTrip(),
    watchGeocodeTripDestination(),
    watchCreateAccommodation(),
    watchUpdateAccommodation(),
    watchGeocodeAccommodation(),
    watchCreateActivity(),
    watchUpdateActivity(),
    watchGeocodeActivity(),
    watchCreateProfile(),
    watchUpdateProfile(),
    watchGeocodeProfile(),
    watchFetchProfile(),
    watchToggleParticipate(),
    watchFetchChats(),
    watchCreateChat(),
    watchUpdateChat(),
  ];
}
