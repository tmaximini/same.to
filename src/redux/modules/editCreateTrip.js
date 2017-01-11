import { isBefore } from 'date-fns';
import { formatDate, getDateFromString } from '../../utils';


const makeDefaultTrip = () => ({
  startAt: formatDate(new Date()),
  endAt: formatDate(new Date()),
  location: {},
});

// Initial State
const initialState = {
  newTrip: {},
  trip: {},
  errors: {},
};


// Constants (Actions)

// edit
export const UPDATE_TRIP_START = 'editTrip/UPDATE_TRIP_START';
export const UPDATE_TRIP_SUCCESS = 'editTrip/UPDATE_TRIP_SUCCESS';
export const UPDATE_TRIP_ERROR = 'editTrip/CREATE_TRIP_ERROR';
export const UPDATE_TRIP = 'editTrip/UPDATE_NEW_TRIP';
export const GEOCODE_TRIP_START = 'editTrip/GEOCODE_TRIP_START';
export const GEOCODE_TRIP_SUCCESS = 'editTrip/GEOCODE_TRIP_SUCCESS';
export const GEOCODE_TRIP_ERROR = 'editTrip/GEOCODE_TRIP_ERROR';

// create
export const CREATE_TRIP_START = 'createTrip/CREATE_TRIP_START';
export const CREATE_TRIP_SUCCESS = 'createTrip/CREATE_TRIP_SUCCESS';
export const CREATE_TRIP_ERROR = 'createTrip/CREATE_TRIP_ERROR';
export const UPDATE_NEW_TRIP = 'createTrip/UPDATE_NEW_TRIP';
export const GEOCODE_NEW_TRIP_START = 'createTrip/GEOCODE_NEW_TRIP_START';
export const GEOCODE_NEW_TRIP_SUCCESS = 'createTrip/GEOCODE_NEW_TRIP_SUCCESS';
export const GEOCODE_NEW_TRIP_ERROR = 'createTrip/GEOCODE_NEW_TRIP_ERROR';


// Action Creators
export const updateRemoteTrip = updateTrip => ({
  type: UPDATE_TRIP_START,
  payload: updateTrip
});

// updates any key/value pair for a new Trip
export const updateTrip = (key, value) => ({
  type: UPDATE_TRIP,
  payload: {
    key, value
  }
});

export const createTrip = newTripData => ({
  type: CREATE_TRIP_START,
  payload: newTripData
});

// updates any key/value pair when editing Trip
export const updateNewTrip = (key, value) => ({
  type: UPDATE_NEW_TRIP,
  payload: {
    key, value
  }
});

export const geocodeLocation = location => ({
  type: GEOCODE_TRIP_START,
  payload: location
});

export const geocodeNewLocation = location => ({
  type: GEOCODE_NEW_TRIP_START,
  payload: location
});

// export all actions
export const actions = {
  updateRemoteTrip,
  createTrip,
  updateTrip,
  updateNewTrip,
  geocodeLocation,
  geocodeNewLocation,
};


// Action Handlers
const actionsMap = {
  [CREATE_TRIP_SUCCESS]: (state) => ({
    ...state,
    newTrip: makeDefaultTrip(),
  }),
  [UPDATE_NEW_TRIP]: (state, action) => {
    const { key, value } = action.payload;
    const newTrip = {
      ...state.newTrip,
      [key]: value
    };

    return {
      ...state,
      newTrip,
    };
  },
  [GEOCODE_NEW_TRIP_SUCCESS]: (state, action) => ({
    ...state,
    newTrip: {
      ...state.newTrip,
      location: action.payload,
    },
  }),
  [GEOCODE_NEW_TRIP_ERROR]: (state, action) => {
    const { locationString, error } = action.payload;

    return {
      ...state,
      newTrip: {
        ...state.newTrip,
        location: {
          formattedAddress: locationString,
        },
      },
      errors: {
        ...state.errors,
        newTrip: error,
      }
    };
  },
  [UPDATE_TRIP_SUCCESS]: (state) => ({
    ...state,
    trip: {},
  }),
  [UPDATE_TRIP]: (state, action) => {
    const { key, value } = action.payload;
    const trip = {
      ...state.trip,
      [key]: value
    };

    return {
      ...state,
      trip,
    };
  },
  [GEOCODE_NEW_TRIP_SUCCESS]: (state, action) => ({
    ...state,
    trip: {
      ...state.trip,
      location: action.payload,
    },
  }),
  [GEOCODE_TRIP_ERROR]: (state, action) => {
    const { locationString, error } = action.payload;

    return {
      ...state,
      trip: {
        ...state.trip,
        location: {
          formattedAddress: locationString,
        },
      },
      errors: {
        ...state.errors,
        trip: error,
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
