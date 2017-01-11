import { isBefore } from 'date-fns';
import { formatDate, getDateFromString } from '../../utils';


const makeDefaultEvent = () => ({
  type: 'event',
  startAt: formatDate(new Date()),
  endAt: formatDate(new Date()),
  location: {},
});

// Initial State
const initialState = {
  newEvent: makeDefaultEvent(),
  editEvent: {},
    // TODO: fetch from server
  types: ['event', 'party', 'gaming', 'shopping', 'concert', 'cinema', 'dinner', 'sport', 'gameing'],
  errors: {},
};


// Constants (Actions)

// edit
export const UPDATE_EVENT_START = 'editEvent/UPDATE_EVENT_START';
export const UPDATE_EVENT_SUCCESS = 'editEvent/UPDATE_EVENT_SUCCESS';
export const UPDATE_EVENT_ERROR = 'editEvent/CREATE_EVENT_ERROR';
export const UPDATE_EVENT = 'editEvent/UPDATE_NEW_EVENT';
export const GEOCODE_EVENT_START = 'editEvent/GEOCODE_EVENT_START';
export const GEOCODE_EVENT_SUCCESS = 'editEvent/GEOCODE_EVENT_SUCCESS';
export const GEOCODE_EVENT_ERROR = 'editEvent/GEOCODE_EVENT_ERROR';

// create
export const CREATE_EVENT_START = 'createEvent/CREATE_EVENT_START';
export const CREATE_EVENT_SUCCESS = 'createEvent/CREATE_EVENT_SUCCESS';
export const CREATE_EVENT_ERROR = 'createEvent/CREATE_EVENT_ERROR';
export const UPDATE_NEW_EVENT = 'createEvent/UPDATE_NEW_EVENT';
export const GEOCODE_NEW_EVENT_START = 'createEvent/GEOCODE_NEW_EVENT_START';
export const GEOCODE_NEW_EVENT_SUCCESS = 'createEvent/GEOCODE_NEW_EVENT_SUCCESS';
export const GEOCODE_NEW_EVENT_ERROR = 'createEvent/GEOCODE_NEW_EVENT_ERROR';


// Action Creators
export const updateRemoteEvent = updateEvent => ({
  type: UPDATE_EVENT_START,
  payload: updateEvent
});

// updates any key/value pair for a new event
export const updateEvent = (key, value) => ({
  type: UPDATE_EVENT,
  payload: {
    key, value
  }
});

export const createEvent = newEventData => ({
  type: CREATE_EVENT_START,
  payload: newEventData
});

// updates any key/value pair when editing event
export const updateNewEvent = (key, value) => ({
  type: UPDATE_NEW_EVENT,
  payload: {
    key, value
  }
});

export const geocodeLocation = location => ({
  type: GEOCODE_EVENT_START,
  payload: location
});

export const geocodeNewLocation = location => ({
  type: GEOCODE_NEW_EVENT_START,
  payload: location
});

// export all actions
export const actions = {
  updateRemoteEvent,
  createEvent,
  updateEvent,
  updateNewEvent,
  geocodeLocation,
  geocodeNewLocation,
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
  [CREATE_EVENT_SUCCESS]: (state) => ({
    ...state,
    newEvent: makeDefaultEvent(),
  }),
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
      newEvent,
    };
  },
  [GEOCODE_NEW_EVENT_SUCCESS]: (state, action) => ({
    ...state,
    newEvent: {
      ...state.newEvent,
      location: action.payload,
    },
  }),
  [GEOCODE_NEW_EVENT_ERROR]: (state, action) => {
    const { locationString, error } = action.payload;

    return {
      ...state,
      newEvent: {
        ...state.newEvent,
        location: {
          formattedAddress: locationString,
        },
      },
      errors: {
        ...state.errors,
        newEvent: error,
      }
    };
  },
  [UPDATE_EVENT_SUCCESS]: (state) => ({
    ...state,
    event: {},
  }),
  [UPDATE_EVENT]: (state, action) => {
    const { key, value } = action.payload;
    let event = {
      ...state.event,
      [key]: value
    };
    if (key === 'startAt' || key === 'endAt') {
      event = ensureDatesAreValid(event);
    }

    return {
      ...state,
      event,
    };
  },
  [GEOCODE_EVENT_SUCCESS]: (state, action) => ({
    ...state,
    event: {
      ...state.event,
      location: action.payload,
    },
  }),
  [GEOCODE_EVENT_ERROR]: (state, action) => {
    const { locationString, error } = action.payload;

    return {
      ...state,
      event: {
        ...state.event,
        location: {
          formattedAddress: locationString,
        },
      },
      errors: {
        ...state.errors,
        event: error,
      }
    };
  },
};


// Reducer
export default (state = initialState, action) => {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
};
