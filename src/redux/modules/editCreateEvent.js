import { isBefore } from 'date-fns';
import { getDateFromString } from '../../utils';


const makeDefaultEvent = () => ({
  name: '',
  startAt: null,
  endAt: null,
  location: {},
  trips: [],
  accommodations: [],
  type: 'event',
  isPublic: true,
});

// Initial State
const initialState = {
  event: makeDefaultEvent(),
  locationString: null,
  errors: {},
  isNew: true,
};


// Constants (Actions)

// edit
export const UPDATE_EVENT_START = 'editEvent/UPDATE_EVENT_START';
export const UPDATE_EVENT_SUCCESS = 'editEvent/UPDATE_EVENT_SUCCESS';
export const UPDATE_EVENT_ERROR = 'editEvent/CREATE_EVENT_ERROR';
export const UPDATE_EVENT = 'editEvent/UPDATE_EVENT';
export const SET_EVENT = 'editEvent/SET_EVENT';
export const RESET_EVENT = 'editEvent/RESET_EVENT';
export const GEOCODE_EVENT_START = 'editEvent/GEOCODE_EVENT_START';
export const GEOCODE_EVENT_SUCCESS = 'editEvent/GEOCODE_EVENT_SUCCESS';
export const GEOCODE_EVENT_ERROR = 'editEvent/GEOCODE_EVENT_ERROR';

// create
export const CREATE_EVENT_START = 'createEvent/CREATE_EVENT_START';
export const CREATE_EVENT_SUCCESS = 'createEvent/CREATE_EVENT_SUCCESS';
export const CREATE_EVENT_ERROR = 'createEvent/CREATE_EVENT_ERROR';


// Action Creators
export const updateRemoteEvent = updateEvent => ({
  type: UPDATE_EVENT_START,
  payload: updateEvent
});

// updates any key/value pair for a new event
export const updateEvent = (key, value) => ({
  type: UPDATE_EVENT,
  payload: {
    key,
    value
  }
});

export const setEvent = model => ({
  type: SET_EVENT,
  payload: {
    model
  }
});

export const resetEvent = () => ({
  type: RESET_EVENT,
});

export const createEvent = newEventData => ({
  type: CREATE_EVENT_START,
  payload: newEventData
});


export const geocodeLocation = location => ({
  type: GEOCODE_EVENT_START,
  payload: {
    location,
    successAction: GEOCODE_EVENT_SUCCESS,
    errorAction: GEOCODE_EVENT_ERROR,
  }
});



// export all actions
export const actions = {
  updateRemoteEvent,
  createEvent,
  updateEvent,
  setEvent,
  geocodeLocation,
  resetEvent,
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
    event: makeDefaultEvent(),
    isNew: true,
  }),
  [RESET_EVENT]: (state) => ({
    ...state,
    event: makeDefaultEvent(),
    isNew: true,
  }),
  [SET_EVENT]: (state, action) => {
    const { model } = action.payload;

    return {
      ...state,
      event: model,
      locationString: model.location ? model.location.formattedAddress : '',
      isNew: false,
    };
  },
  [UPDATE_EVENT_SUCCESS]: (state) => ({
    ...state,
    event: makeDefaultEvent(),
    isNew: true,
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
