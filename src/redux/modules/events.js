import _ from 'lodash';
import { REHYDRATE } from 'redux-persist/constants';
import {
  CREATE_EVENT_SUCCESS,
  UPDATE_EVENT_SUCCESS,
  DELETE_EVENT_SUCCESS,
} from './editCreateEvent';
import {
  CREATE_TRIP_SUCCESS,
  UPDATE_TRIP_SUCCESS,
  DELETE_TRIP_SUCCESS,
} from './editCreateTrip';
import {
  UPDATE_ACCOMMODATION_SUCCESS,
  CREATE_ACCOMMODATION_SUCCESS,
  DELETE_ACCOMMODATION_SUCCESS,
} from './editCreateAccommodation';
import {
  UPDATE_ACTIVITY_SUCCESS,
  CREATE_ACTIVITY_SUCCESS,
  DELETE_ACTIVITY_SUCCESS,
} from './editCreateActivity';

// Initial State
const initialState = {
  isFetching: false,
  events: [],
  pastEvents: [],
  searchString: null,
  searchResults: [],
  currentEvent: {},
  error: null,
};


// Constants (Actions)
export const FETCH_EVENTS_START = 'events/FETCH_EVENTS_START';
export const FETCH_EVENTS_SUCCESS = 'events/FETCH_EVENTS_SUCCESS';
export const FETCH_EVENTS_ERROR = 'events/FETCH_EVENTS_ERROR';
export const FETCH_PAST_EVENTS_START = 'events/FETCH_PAST_EVENTS_START';
export const FETCH_PAST_EVENTS_SUCCESS = 'events/FETCH_PAST_EVENTS_SUCCESS';
export const FETCH_PAST_EVENTS_ERROR = 'events/FETCH_PAST_EVENTS_ERROR';
export const SET_CURRENT_EVENT = 'events/UPDATE_EVENT';
export const TOGGLE_PARTICIPATE_EVENT_START = 'events/TOGGLE_PARTICIPATE_EVENT_START';
export const TOGGLE_PARTICIPATE_EVENT_SUCCESS = 'events/TOGGLE_PARTICIPATE_EVENT_SUCCESS';
export const TOGGLE_PARTICIPATE_EVENT_ERROR = 'events/TOGGLE_PARTICIPATE_EVENT_ERROR';
export const SEARCH_EVENTS_START = 'events/SEARCH_EVENTS_START';
export const SEARCH_EVENTS_SUCCESS = 'events/SEARCH_EVENTS_SUCCESS';
export const SEARCH_EVENTS_ERROR = 'events/SEARCH_EVENTS_ERROR';
export const BOOKMARK_EVENT_START = 'events/BOOKMARK_EVENT_START';
export const BOOKMARK_EVENT_SUCCESS = 'events/BOOKMARK_EVENT_SUCCESS';
export const BOOKMARK_EVENT_ERROR = 'events/BOOKMARK_EVENT_ERROR';
export const UNBOOKMARK_EVENT_START = 'events/UNBOOKMARK_EVENT_START';
export const UNBOOKMARK_EVENT_SUCCESS = 'events/UNBOOKMARK_EVENT_SUCCESS';
export const UNBOOKMARK_EVENT_ERROR = 'events/UNBOOKMARK_EVENT_ERROR';



// Action Creators
export const fetchEvents = () => ({
  type: FETCH_EVENTS_START
});

export const fetchPastEvents = () => ({
  type: FETCH_PAST_EVENTS_START
});

export const toggleParticipateEvent = event => ({
  type: TOGGLE_PARTICIPATE_EVENT_START,
  payload: {
    event
  }
});

export const setCurrentEvent = event => ({
  type: SET_CURRENT_EVENT,
  payload: {
    event
  }
});

export const searchEvents = query => ({
  type: SEARCH_EVENTS_START,
  payload: {
    query
  }
});

export const bookmarkEvent = event => ({
  type: BOOKMARK_EVENT_START,
  payload: {
    event
  }
});

export const unbookmarkEvent = event => ({
  type: UNBOOKMARK_EVENT_START,
  payload: {
    event
  }
});

// export all actions
export const actions = {
  fetchEvents,
  fetchPastEvents,
  setCurrentEvent,
  toggleParticipateEvent,
  searchEvents,
  bookmarkEvent,
  unbookmarkEvent,
};

const updateEvents = (lastState, subitem, collection) => {
  const newEvents = [...lastState.events];
  const eventIndex = _.findIndex(newEvents, { id: subitem.eventId });
  const index = _.findIndex(newEvents[eventIndex][collection], { id: subitem.id });
  if (index === -1) {
    newEvents[eventIndex][collection].push(subitem);
  } else {
    newEvents[eventIndex][collection][index] = subitem;
  }

  return {
    ...lastState,
    currentEvent: newEvents[eventIndex],
    events: newEvents
  };
};


const removeSubItem = (lastState, subitem, collection) => {
  const newEvents = [...lastState.events];
  const eventIndex = _.findIndex(newEvents, { id: subitem.eventId });
  const index = _.findIndex(newEvents[collection], { id: subitem.id });
  // remove the subitem from the collection
  newEvents[eventIndex][collection].splice(index, 1);

  return {
    ...lastState,
    currentEvent: newEvents[eventIndex],
    events: newEvents
  };
};

const updateSearchResults = (oldResults, event) => {
  const newResults = [...oldResults];
  const eventIndex = _.findIndex(newResults, { id: event.id });
  if (eventIndex > -1) {
    newResults[eventIndex] = event;
  }

  return newResults;
};


// Action Handlers
const actionsMap = {
    // don't rehydrate search results
  [REHYDRATE]: (state, action) => ({
    ...state,
    ...action.payload.events,
    searchResults: [],
  }),
  [FETCH_EVENTS_START]: state => ({ ...state, isFetching: true }),
  [FETCH_EVENTS_SUCCESS]: (state, action) => {
    const { events } = action.payload;

    return {
      ...state,
      events,
      isFetching: false,
    };
  },
  [FETCH_PAST_EVENTS_START]: state => ({ ...state, isFetching: true }),
  [FETCH_PAST_EVENTS_SUCCESS]: (state, action) => {
    const { events } = action.payload;

    return {
      ...state,
      pastEvents: events,
      isFetching: false,
    };
  },
  [FETCH_EVENTS_ERROR]: state => ({ ...state, isFetching: false }),
  [FETCH_PAST_EVENTS_ERROR]: state => ({ ...state, isFetching: false }),
  [SET_CURRENT_EVENT]: (state, action) => ({
    ...state,
    currentEvent: action.payload.event,
  }),
  [SEARCH_EVENTS_SUCCESS]: (state, action) => {
    const { result } = action.payload;

    return {
      ...state,
      searchResults: result,
    };
  },
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
  [DELETE_EVENT_SUCCESS]: (state, action) => {
    const { event } = action.payload;
    const newEvents = [...state.events.filter(e => e.id !== event.id)];

    return {
      ...state,
      events: newEvents,
    };
  },
  [TOGGLE_PARTICIPATE_EVENT_SUCCESS]: (state, action) => {
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
  [CREATE_TRIP_SUCCESS]: (state, action) => {
    const { trip } = action.payload;
    return updateEvents(state, trip, 'trips');
  },
  [UPDATE_TRIP_SUCCESS]: (state, action) => {
    const { trip } = action.payload;
    return updateEvents(state, trip, 'trips');
  },
  [DELETE_TRIP_SUCCESS]: (state, action) => {
    const { trip } = action.payload;
    return removeSubItem(state, trip, 'trips');
  },
  [CREATE_ACCOMMODATION_SUCCESS]: (state, action) => {
    const { accommodation } = action.payload;
    return updateEvents(state, accommodation, 'accommodations');
  },
  [UPDATE_ACCOMMODATION_SUCCESS]: (state, action) => {
    const { accommodation } = action.payload;
    return updateEvents(state, accommodation, 'accommodations');
  },
  [DELETE_ACCOMMODATION_SUCCESS]: (state, action) => {
    const { accommodation } = action.payload;
    return removeSubItem(state, accommodation, 'accommodations');
  },
  [CREATE_ACTIVITY_SUCCESS]: (state, action) => {
    const { activity } = action.payload;
    if (activity.eventId) {
      return updateEvents(state, activity, 'activities');
    }
    return state;
  },
  [UPDATE_ACTIVITY_SUCCESS]: (state, action) => {
    const { activity } = action.payload;
    if (activity.eventId) {
      return updateEvents(state, activity, 'activities');
    }
    return state;
  },
  [DELETE_ACTIVITY_SUCCESS]: (state, action) => {
    const { activity } = action.payload;
    if (activity.eventId) {
      return removeSubItem(state, activity, 'activities');
    }
    return state;
  },
  [BOOKMARK_EVENT_SUCCESS]: (state, action) => {
    const { event } = action.payload;

    return {
      ...state,
      searchResults: updateSearchResults(state.searchResults, event),
    };
  },
  [UNBOOKMARK_EVENT_SUCCESS]: (state, action) => {
    const { event } = action.payload;

    return {
      ...state,
      searchResults: updateSearchResults(state.searchResults, event),
    };
  },
};


// Reducer
export default (state = initialState, action) => {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
};
