import { isBefore } from 'date-fns';
import { getDateFromString } from '../../utils';

// Initial State
const initialState = {
  isFetching: false,
  events: [],
  newEvent: {},
  // TODO: fetch from server
  types: ['event', 'party', 'gaming', 'shopping', 'concert', 'cinema', 'dinner', 'sport', 'gameing']
};


// Constants (Actions)
export const FETCH_EVENTS_START = 'events/FETCH_EVENTS_START';
export const FETCH_EVENTS_SUCCESS = 'events/FETCH_EVENTS_SUCCESS';
export const FETCH_EVENTS_ERROR = 'events/FETCH_EVENTS_ERROR';
export const CREATE_EVENT_START = 'events/CREATE_EVENT_START';
export const CREATE_EVENT_SUCCESS = 'events/CREATE_EVENT_SUCCESS';
export const CREATE_EVENT_ERROR = 'events/CREATE_EVENT_ERROR';
export const UPDATE_EVENT = 'events/UPDATE_EVENT';
export const UPDATE_NEW_EVENT = 'events/UPDATE_NEW_EVENT';



// Action Creators
export const fetchEvents = () => ({
  type: FETCH_EVENTS_START
});

export const createEvent = newEventData => ({
  type: CREATE_EVENT_START,
  payload: newEventData
});

// updates any key/value pair in the state
export const update = data => ({
  type: UPDATE_EVENT,
  payload: {
    ...data
  }
});

// updates any key/value pair for a new event
export const updateNewEvent = (key, value) => ({
  type: UPDATE_NEW_EVENT,
  payload: {
    key, value
  }
});

// export all actions
export const actions = {
  fetchEvents,
  createEvent,
  update,
  updateNewEvent,
};


// make sure endDate is not before startDate
const ensureDatesAreValid = event => {
  const newEvent = { ...event };
  const { startAt, endAt } = event;
  if (isBefore(getDateFromString(endAt), getDateFromString(startAt))) {
    newEvent.endAt = newEvent.startAt;
  }

  return newEvent;
};


// Action Handlers
const actionsMap = {
  [FETCH_EVENTS_SUCCESS]: (state, action) => {
    const { events } = action.payload;

    return {
      ...state,
      events,
      isFetching: false,
    };
  },
  [FETCH_EVENTS_ERROR]: state => ({ ...state, isFetching: false }),
  [FETCH_EVENTS_START]: state => ({ ...state, isFetching: true }),
  // TODO
  [UPDATE_EVENT]: state => ({ ...state }),
  [UPDATE_NEW_EVENT]: (state, action) => {
    const { key, value } = action.payload;
    let newEvent = {
      ...state.newEvent,
      [key]: value
    };
    if (key === 'startAt' || key === 'endAt') {
      newEvent = ensureDatesAreValid(newEvent);
    }

    return {
      ...state,
      newEvent
    };
  },
};


// Reducer
export default (state = initialState, action) => {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
};
