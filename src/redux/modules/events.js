import _ from 'lodash';
import {
  CREATE_EVENT_SUCCESS,
  UPDATE_EVENT_SUCCESS,
} from './editCreateEvent';
import {
  CREATE_TRIP_SUCCESS,
  UPDATE_TRIP_SUCCESS,
} from './editCreateTrip';
import {
  UPDATE_ACCOMMODATION_SUCCESS,
  CREATE_ACCOMMODATION_SUCCESS
} from './editCreateAccommodation';

// Initial State
const initialState = {
  isFetching: false,
  events: [],
  currentEvent: {},
  error: null,
};


// Constants (Actions)
export const FETCH_EVENTS_START = 'events/FETCH_EVENTS_START';
export const FETCH_EVENTS_SUCCESS = 'events/FETCH_EVENTS_SUCCESS';
export const FETCH_EVENTS_ERROR = 'events/FETCH_EVENTS_ERROR';
export const SET_CURRENT_EVENT = 'events/UPDATE_EVENT';



// Action Creators
export const fetchEvents = () => ({
  type: FETCH_EVENTS_START
});

// // updates any key/value pair in the state
// export const update = data => ({
//   type: UPDATE_EVENT,
//   payload: {
//     ...data
//   }
// });

export const setCurrentEvent = event => ({
  type: SET_CURRENT_EVENT,
  payload: {
    event
  }
});


// export all actions
export const actions = {
  fetchEvents,
  setCurrentEvent,
};



// Action Handlers
const actionsMap = {
  [FETCH_EVENTS_START]: state => ({ ...state, isFetching: true }),
  [FETCH_EVENTS_SUCCESS]: (state, action) => {
    const { events } = action.payload;

    return {
      ...state,
      events,
      isFetching: false,
    };
  },
  [FETCH_EVENTS_ERROR]: state => ({ ...state, isFetching: false }),
  [SET_CURRENT_EVENT]: (state, action) => ({
    ...state,
    currentEvent: action.payload.event,
  }),
  [CREATE_EVENT_SUCCESS]: (state, action) => {
    const { event } = action.payload;

    // add new event to list
    return {
      ...state,
      events: [event, ...state.events],
    };
  },
  [UPDATE_EVENT_SUCCESS]: (state, action) => {
    const { event } = action.payload;
    const newEvents = [...state.events];
    const eventIndex = _.findIndex(newEvents, { id: event.id });
    newEvents[eventIndex] = event;

    return {
      ...state,
      events: newEvents,
      currentEvent: event,
    };
  },
  [UPDATE_TRIP_SUCCESS]: (state, action) => {
    const { trip } = action.payload;
    const newEvents = [...state.events];
    const eventIndex = _.findIndex(newEvents, { id: trip.eventId });
    const tripIndex = _.findIndex(newEvents.trips, { id: trip.id });
    newEvents[eventIndex].trips[tripIndex] = trip;

    return {
      ...state,
      currentEvent: newEvents[eventIndex],
      events: newEvents
    };
  },
  [CREATE_TRIP_SUCCESS]: (state, action) => {
    const { trip } = action.payload;
    const newEvents = [...state.events];
    const eventIndex = _.findIndex(newEvents, { id: trip.eventId });
    const tripIndex = _.findIndex(newEvents.trips, { id: trip.id });
    if (tripIndex === -1) {
      newEvents[eventIndex].trips.push(trip);
    }

    return {
      ...state,
      currentEvent: newEvents[eventIndex],
      events: newEvents
    };
  },
  [UPDATE_ACCOMMODATION_SUCCESS]: (state, action) => {
    const { accommodation } = action.payload;
    const newEvents = [...state.events];
    const eventIndex = _.findIndex(newEvents, { id: accommodation.eventId });
    const accommodationIndex = _.findIndex(newEvents.accommodations, { id: accommodation.id });
    newEvents[eventIndex].accommodations[accommodationIndex] = accommodation;

    return {
      ...state,
      currentEvent: newEvents[eventIndex],
      events: newEvents
    };
  },
  [CREATE_ACCOMMODATION_SUCCESS]: (state, action) => {
    const { accommodation } = action.payload;
    const newEvents = [...state.events];
    const eventIndex = _.findIndex(newEvents, { id: accommodation.eventId });
    const accommodationIndex = _.findIndex(newEvents.accommodations, { id: accommodation.id });
    if (accommodationIndex === -1) {
      newEvents[eventIndex].accommodations.push(accommodation);
    }

    return {
      ...state,
      currentEvent: newEvents[eventIndex],
      events: newEvents
    };
  },
};


// Reducer
export default (state = initialState, action) => {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
};
