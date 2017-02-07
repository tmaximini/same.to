import { takeLatest, call, put } from 'redux-saga/effects';
import {
  TOGGLE_PARTICIPATE_START,
  TOGGLE_PARTICIPATE_SUCCESS,
  TOGGLE_PARTICIPATE_ERROR,
} from '../modules/detail';
import {
  joinTrip,
  joinAccommodation,
  joinActivity,
  leaveTrip,
  leaveAccommodation,
  leaveActivity,
} from '../../services/participate';
import { getUserId } from '../../services/api';


const handlers = {
  trip: {
    join: joinTrip,
    leave: leaveTrip,
  },
  accommodation: {
    join: joinAccommodation,
    leave: leaveAccommodation,
  },
  activity: {
    join: joinActivity,
    leave: leaveActivity,
  }
};

/**
 * takes care of fetching contacts
 */
export function* toggleParticipateAsync(action) {
  const userId = getUserId();
  const { itemType, item } = action.payload;

  // check if we are currently member, if yes: leave, if no: join
  const isJoin = item.memberIds.includes(userId);
  const handler = isJoin ? handlers[itemType].leave : handlers[itemType].join;

  try {
    const response = yield call(handler, item.eventId, item.id);
    if (response.error) {
      // in case of error
      yield put({
        type: TOGGLE_PARTICIPATE_ERROR,
        payload: {
          error: response.error
        }
      });
    } else {
      // success
      yield put({
        type: TOGGLE_PARTICIPATE_SUCCESS,
        payload: {
          item: response.model
        }
      });
    }
  } catch (error) {
    console.log({ error });
    yield put({
      type: TOGGLE_PARTICIPATE_ERROR,
      error
    });
  }
}

export function* watchToggleParticipate() {
  // spawn new task on each action, cancel the one before if not yet finished
  yield takeLatest(TOGGLE_PARTICIPATE_START, toggleParticipateAsync);
}
