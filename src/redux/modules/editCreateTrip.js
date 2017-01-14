import { isBefore } from 'date-fns';
import { formatDate, getDateFromString } from '../../utils';


const makeDefaultTrip = () => ({
  startAt: formatDate(new Date()),
  endAt: formatDate(new Date()),
  location: {},
});

// Initial State
const initialState = {
  trip: {},
  errors: {},
  tripTypes: ['car', 'airplane', 'train', 'bus', 'taxi', 'driver'],
};


// Constants (Actions)

// edit
export const UPDATE_TRIP_START = 'editTrip/UPDATE_TRIP_START';
export const UPDATE_TRIP_SUCCESS = 'editTrip/UPDATE_TRIP_SUCCESS';
export const UPDATE_TRIP_ERROR = 'editTrip/CREATE_TRIP_ERROR';
export const UPDATE_TRIP = 'editTrip/UPDATE_NEW_TRIP';
export const SET_TRIP = 'editTrip/SET_NEW_TRIP';
export const GEOCODE_TRIP_START = 'editTrip/GEOCODE_TRIP_START';
export const GEOCODE_TRIP_SUCCESS = 'editTrip/GEOCODE_TRIP_SUCCESS';
export const GEOCODE_TRIP_ERROR = 'editTrip/GEOCODE_TRIP_ERROR';

// create
export const CREATE_TRIP_START = 'createTrip/CREATE_TRIP_START';
export const CREATE_TRIP_SUCCESS = 'createTrip/CREATE_TRIP_SUCCESS';
export const CREATE_TRIP_ERROR = 'createTrip/CREATE_TRIP_ERROR';



// Action Creators
export const updateRemoteTrip = updateTrip => ({
  type: UPDATE_TRIP_START,
  payload: updateTrip
});

// updates any key/value pair for a new Trip
export const updateTrip = (key, value) => ({
  type: UPDATE_TRIP,
  payload: {
    key,
    value
  }
});

export const setTrip = model => ({
  type: SET_TRIP,
  payload: {
    model
  }
});

export const createTrip = newTripData => ({
  type: CREATE_TRIP_START,
  payload: newTripData
});



export const geocodeLocation = location => ({
  type: GEOCODE_TRIP_START,
  payload: location
});



// export all actions
export const actions = {
  updateRemoteTrip,
  createTrip,
  setTrip,
  updateTrip,
  geocodeLocation,
};


// Action Handlers
const actionsMap = {
  [CREATE_TRIP_SUCCESS]: (state) => ({
    ...state,
    trip: makeDefaultTrip(),
  }),
  [UPDATE_TRIP_SUCCESS]: (state) => ({
    ...state,
    trip: {},
  }),
  [SET_TRIP]: (state, action) => ({
    ...state,
    trip: action.payload.model,
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
