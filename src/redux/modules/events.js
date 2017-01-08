// Initial State
const initialState = {
  isFetching: false,
  events: [],
  // TODO: fetch from server
  types: ['event', 'party', 'gaming', 'shopping', 'concert', 'cinema', 'dinner', 'sport', 'gameing'],
  error: null,
};


// Constants (Actions)
export const FETCH_EVENTS_START = 'events/FETCH_EVENTS_START';
export const FETCH_EVENTS_SUCCESS = 'events/FETCH_EVENTS_SUCCESS';
export const FETCH_EVENTS_ERROR = 'events/FETCH_EVENTS_ERROR';
export const UPDATE_EVENT = 'events/UPDATE_EVENT';



// Action Creators
export const fetchEvents = () => ({
  type: FETCH_EVENTS_START
});

// updates any key/value pair in the state
export const update = data => ({
  type: UPDATE_EVENT,
  payload: {
    ...data
  }
});


// export all actions
export const actions = {
  fetchEvents,
  update,
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
  // TODO
  [UPDATE_EVENT]: state => ({ ...state }),
};


// Reducer
export default (state = initialState, action) => {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
};
