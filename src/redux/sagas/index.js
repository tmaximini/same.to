// import { fork } from 'redux-saga/effects';

import { watchLogin, watchFBLogin } from './auth';
import { watchFetchEvents } from './events';
import { watchFetchContacts } from './contacts';
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

// SAGAs
// 1. define worker sagas
// 2. define watcher sagas
// 3. define root saga as single point of entry to start all sagas at once


/*
 * The entry point for all the sagas used in this application.
 */
export default function* root() {
  yield [
    watchLogin(),
    watchFBLogin(),
    watchFetchEvents(),
    watchFetchContacts(),
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
  ];
}
