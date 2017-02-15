import { takeLatest, call, put } from 'redux-saga/effects';
import { Actions } from 'react-native-router-flux';
import {
  FETCH_EVENTS_START,
  FETCH_EVENTS_SUCCESS,
  FETCH_EVENTS_ERROR,
  TOGGLE_PARTICIPATE_EVENT_START,
  TOGGLE_PARTICIPATE_EVENT_SUCCESS,
  TOGGLE_PARTICIPATE_EVENT_ERROR,
} from '../modules/events';
import {
  AUTHORIZATION_REQUIRED,
} from '../modules/auth';
import { fetchEvents } from '../../services/events';
import {
  joinEvent,
  leaveEvent,
} from '../../services/participate';
import { getUserId } from '../../services/api';


/**
 * takes care of fetching events
 */
export function* fetchEventsAsync(action) {
  const { payload } = action;
  try {
    const response = yield call(fetchEvents, { ...payload });

    if (response.error) {
      // in case of error
      yield put({
        type: FETCH_EVENTS_ERROR,
        payload: {
          events: [],
          error: response.error
        }
      });
      if (response.error.statusCode === 401) {
        yield put({
          type: AUTHORIZATION_REQUIRED
        });
        yield call(Actions.login, { type: 'replace' });
      }
    } else {
      // success
      yield put({
        type: FETCH_EVENTS_SUCCESS,
        payload: {
          events: response
        }
      });
    }
  } catch (error) {
    console.log({ error });
    yield put({
      type: FETCH_EVENTS_ERROR,
      error
    });
  }
}

export function* toggleParticipateAsync(action) {
  const userId = getUserId();
  const { event } = action.payload;

  // check if we are currently member, if yes: leave, if no: join
  const isMember = event.memberIds.includes(userId);
  const handler = isMember ? leaveEvent : joinEvent;

  try {
    const response = yield call(handler, event.id);
    if (response.error) {
      // in case of error
      yield put({
        type: TOGGLE_PARTICIPATE_EVENT_ERROR,
        payload: {
          error: response.error
        }
      });
    } else {
      // success
      yield put({
        type: TOGGLE_PARTICIPATE_EVENT_SUCCESS,
        payload: {
          event: response.model
        }
      });
    }
  } catch (error) {
    console.log({ error });
    yield put({
      type: TOGGLE_PARTICIPATE_EVENT_ERROR,
      error
    });
  }
}

export function* watchFetchEvents() {
  yield takeLatest(FETCH_EVENTS_START, fetchEventsAsync);
}

export function* watchParticipateEvent() {
  yield takeLatest(TOGGLE_PARTICIPATE_EVENT_START, toggleParticipateAsync);
}
