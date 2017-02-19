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
  watchSearchFavorites,
  watchGeocodeSearchFavorites,
} from './contacts';
import {
  watchCreateEvent,
  watchUpdateEvent,
  watchGeocodeEvent,
  watchDeleteEvent,
} from './editCreateEvent';
import {
  watchCreateTrip,
  watchUpdateTrip,
  watchGeocodeTrip,
  watchGeocodeTripDestination,
  watchDeleteTrip,
} from './editCreateTrip';
import {
  watchCreateAccommodation,
  watchUpdateAccommodation,
  watchGeocodeAccommodation,
  watchDeleteAccommodation,
} from './editCreateAccommodation';
import {
  watchCreateActivity,
  watchUpdateActivity,
  watchGeocodeActivity,
  watchDeleteActivity,
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
  watchDeleteChat,
} from './chats';
import {
  watchFetchAccommodationTypes,
  watchFetchTripTypes,
  watchFetchActivityTypes,
} from './types';

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
    watchSearchFavorites(),
    watchGeocodeSearchFavorites(),
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
    watchFetchAccommodationTypes(),
    watchFetchTripTypes(),
    watchFetchActivityTypes(),
    watchDeleteEvent(),
    watchDeleteActivity(),
    watchDeleteAccommodation(),
    watchDeleteTrip(),
    watchDeleteChat(),
  ];
}
