// 1. define worker sagas
// 2. define watcher sagas
// 3. define root saga as single point of entry to start all sagas at once

import { watchLogin, watchFBLogin, watchRegister } from './auth';
import {
  watchFetchEvents,
  watchFetchPastEvents,
  watchParticipateEvent,
  watchSearchEvents,
  watchBookmarkEvents,
  watchUnbookmarkEvents
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
  watchAcceptContact,
  watchDeclineContact
} from './contacts';
import {
  watchCreateEvent,
  watchUpdateEvent,
  watchGeocodeEvent,
  watchDeleteEvent
} from './editCreateEvent';
import {
  watchCreateTrip,
  watchUpdateTrip,
  watchGeocodeTrip,
  watchGeocodeTripDestination,
  watchDeleteTrip
} from './editCreateTrip';
import {
  watchCreateAccommodation,
  watchUpdateAccommodation,
  watchGeocodeAccommodation,
  watchDeleteAccommodation
} from './editCreateAccommodation';
import {
  watchCreateActivity,
  watchUpdateActivity,
  watchGeocodeActivity,
  watchDeleteActivity
} from './editCreateActivity';
import {
  watchCreateProfile,
  watchUpdateProfile,
  watchGeocodeProfile,
  watchFetchProfile
} from './editCreateProfile';
import { watchToggleParticipate } from './detail';
import {
  watchFetchChats,
  watchCreateChat,
  watchUpdateChat,
  watchDeleteChat,
  watchLeaveChat
} from './chats';
import {
  watchFetchAccommodationTypes,
  watchFetchTripTypes,
  watchFetchActivityTypes
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
    watchFetchPastEvents(),
    watchSearchEvents(),
    watchBookmarkEvents(),
    watchUnbookmarkEvents(),
    watchParticipateEvent(),
    watchFetchContacts(),
    watchFetchFavorites(),
    watchAddContact(),
    watchAcceptContact(),
    watchDeclineContact(),
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
    watchLeaveChat()
  ];
}
