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
import {
  UPDATE_ACTIVITY_SUCCESS,
  CREATE_ACTIVITY_SUCCESS,
} from './editCreateActivity';

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

const updateEvents = (lastState, subitem, collection) => {
  const newEvents = [...lastState.events];
  const eventIndex = _.findIndex(newEvents, { id: subitem.eventId });
  const index = _.findIndex(newEvents[collection], { id: subitem.id });
  if (index === -1) {
    newEvents[eventIndex][collection].push(subitem);
  } else {
    newEvents[eventIndex][collection][index] = subitem;
  }

  console.log('newEvents[eventIndex]', newEvents[eventIndex]);

  return {
    ...lastState,
    currentEvent: newEvents[eventIndex],
    events: newEvents
  };
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
    return updateEvents(state, trip, 'trips');
  },
  [CREATE_TRIP_SUCCESS]: (state, action) => {
    const { trip } = action.payload;
    return updateEvents(state, trip, 'trips');
  },
  [UPDATE_ACCOMMODATION_SUCCESS]: (state, action) => {
    const { accommodation } = action.payload;
    return updateEvents(state, accommodation, 'accommodations');
  },
  [CREATE_ACCOMMODATION_SUCCESS]: (state, action) => {
    const { accommodation } = action.payload;
    return updateEvents(state, accommodation, 'accommodations');
  },
  [UPDATE_ACTIVITY_SUCCESS]: (state, action) => {
    const { activity } = action.payload;
    return updateEvents(state, activity, 'activities');
  },
  [CREATE_ACTIVITY_SUCCESS]: (state, action) => {
    const { activity } = action.payload;
    return updateEvents(state, activity, 'activities');
  },
};


// Reducer
export default (state = initialState, action) => {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
};
