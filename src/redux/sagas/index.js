// import { fork } from 'redux-saga/effects';

import { watchLogin } from './auth';
import { watchFetchEvents, watchCreateEvent } from './events';

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
    watchFetchEvents(),
    watchCreateEvent(),
  ];
}
