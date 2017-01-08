import { isBefore } from 'date-fns';
import { formatDate, getDateFromString } from '../../utils';


const makeDefaultEvent = () => ({
  type: 'event',
  startAt: formatDate(new Date()),
  endAt: formatDate(new Date()),
  location: {},
});

// Initial State
const initialState = makeDefaultEvent();


// Constants (Actions)
export const CREATE_EVENT_START = 'events/CREATE_EVENT_START';
export const CREATE_EVENT_SUCCESS = 'events/CREATE_EVENT_SUCCESS';
export const CREATE_EVENT_ERROR = 'events/CREATE_EVENT_ERROR';
export const UPDATE_NEW_EVENT = 'events/UPDATE_NEW_EVENT';
export const GEOCODE_NEW_EVENT_START = 'events/GEOCODE_NEW_EVENT_START';
export const GEOCODE_NEW_EVENT_SUCCESS = 'events/GEOCODE_NEW_EVENT_SUCCESS';
export const GEOCODE_NEW_EVENT_ERROR = 'events/GEOCODE_NEW_EVENT_ERROR';



// Action Creators
export const createEvent = newEventData => ({
  type: CREATE_EVENT_START,
  payload: newEventData
});

// updates any key/value pair for a new event
export const updateNewEvent = (key, value) => ({
  type: UPDATE_NEW_EVENT,
  payload: {
    key, value
  }
});

export const geocodeLocation = location => ({
  type: GEOCODE_NEW_EVENT_START,
  payload: location
});

// export all actions
export const actions = {
  createEvent,
  updateNewEvent,
  geocodeLocation,
};


// make sure endDate is not before startDate
const ensureDatesAreValid = event => {
  const newEvent = { ...event };
  const { startAt, endAt } = event;
  console.info(startAt, endAt, getDateFromString(endAt), getDateFromString(startAt));
  if (isBefore(getDateFromString(endAt), getDateFromString(startAt))) {
    newEvent.endAt = newEvent.startAt;
  }

  return newEvent;
};


// Action Handlers
const actionsMap = {
  [CREATE_EVENT_SUCCESS]: (state, action) => {
    const { event } = action.payload;

    // add new event to list, reset newEvent object
    return {
      ...state,
      events: [event, ...state.events],
      newEvent: makeDefaultEvent()
    };
  },
  [UPDATE_NEW_EVENT]: (state, action) => {
    const { key, value } = action.payload;
    let newEvent = {
      ...state,
      [key]: value
    };
    if (key === 'startAt' || key === 'endAt') {
      newEvent = ensureDatesAreValid(newEvent);
    }

    return newEvent;
  },
  [GEOCODE_NEW_EVENT_SUCCESS]: (state, action) => ({ ...state, location: action.payload }),
  [GEOCODE_NEW_EVENT_ERROR]: (state, action) => ({ ...state, location: null, error: action.payload.error }),
};


// Reducer
export default (state = initialState, action) => {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
};
