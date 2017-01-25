import { formatDate, toggleArrayItem } from '../../utils';

const makeDefaultTrip = () => ({
  startDate: null,
  location: {},
  types: [],
  pickupRadius: 0,
  isPublic: true,
  isNew: true,
});

// Initial State
const initialState = {
  trip: makeDefaultTrip(),
  errors: {},
  tripTypes: ['car', 'airplane', 'train', 'bus', 'taxi', 'driver'],
  pickupString: null,
  destinationString: null,
};


// Constants (Actions)

// edit
export const UPDATE_TRIP_START = 'editTrip/UPDATE_TRIP_START';
export const UPDATE_TRIP_SUCCESS = 'editTrip/UPDATE_TRIP_SUCCESS';
export const UPDATE_TRIP_ERROR = 'editTrip/CREATE_TRIP_ERROR';
export const UPDATE_TRIP = 'editTrip/UPDATE_TRIP';
export const TOGGLE_TYPE = 'editTrip/TOGGLE_TYPE';
export const SET_TRIP = 'editTrip/SET_TRIP';
export const GEOCODE_TRIP_START = 'editTrip/GEOCODE_TRIP_START';
export const GEOCODE_TRIP_SUCCESS = 'editTrip/GEOCODE_TRIP_SUCCESS';
export const GEOCODE_TRIP_ERROR = 'editTrip/GEOCODE_TRIP_ERROR';
export const GEOCODE_TRIP_DESTINATION_START = 'editTrip/GEOCODE_TRIP_DESTINATION_START';
export const GEOCODE_TRIP_DESTINATION_SUCCESS = 'editTrip/GEOCODE_TRIP_DESTINATION_SUCCESS';
export const GEOCODE_TRIP_DESTINATION_ERROR = 'editTrip/GEOCODE_TRIP_DESTINATION_ERROR';

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

export const toggleType = key => ({
  type: TOGGLE_TYPE,
  payload: {
    key,
  }
});

export const setTrip = model => ({
  type: SET_TRIP,
  payload: {
    model
  }
});

export const createTrip = (newTripData, eventId) => ({
  type: CREATE_TRIP_START,
  payload: {
    data: newTripData,
    eventId
  },
});



export const geocodeLocation = location => ({
  type: GEOCODE_TRIP_START,
  payload: {
    location,
    successAction: GEOCODE_TRIP_SUCCESS,
    errorAction: GEOCODE_TRIP_ERROR,
  }
});

export const geocodeDestination = location => ({
  type: GEOCODE_TRIP_DESTINATION_START,
  payload: {
    location,
    successAction: GEOCODE_TRIP_DESTINATION_SUCCESS,
    errorAction: GEOCODE_TRIP_DESTINATION_ERROR,
  }
});



// export all actions
export const actions = {
  updateRemoteTrip,
  createTrip,
  setTrip,
  updateTrip,
  toggleType,
  geocodeLocation,
  geocodeDestination
};





// Action Handlers
const actionsMap = {
  [CREATE_TRIP_SUCCESS]: (state) => ({
    ...state,
    trip: makeDefaultTrip(),
  }),
  [UPDATE_TRIP_SUCCESS]: (state) => ({
    ...state,
    trip: makeDefaultTrip(),
  }),
  [SET_TRIP]: (state, action) => {
    const { model } = action.payload;

    return {
      ...state,
      trip: model,
      pickupString: model.pickupLocation ? model.pickupLocation.formattedAddress : '',
      destinationString: model.destinationLocation ? model.destinationLocation.formattedAddress : '',
      isNew: false,
    };
  },
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
  [TOGGLE_TYPE]: (state, action) => {
    const { key } = action.payload;

    return {
      ...state,
      trip: {
        ...state.trip,
        types: toggleArrayItem(state.trip.types, key)
      }
    };
  },
  [GEOCODE_TRIP_SUCCESS]: (state, action) => ({
    ...state,
    trip: {
      ...state.trip,
      pickupLocation: action.payload,
    },
  }),
  [GEOCODE_TRIP_ERROR]: (state, action) => {
    const { locationString, error } = action.payload;

    return {
      ...state,
      trip: {
        ...state.trip,
        pickupLocation: {
          formattedAddress: locationString,
        },
      },
      errors: {
        ...state.errors,
        trip: error,
      }
    };
  },
  [GEOCODE_TRIP_DESTINATION_SUCCESS]: (state, action) => ({
    ...state,
    trip: {
      ...state.trip,
      destinationLocation: action.payload,
    },
  }),
  [GEOCODE_TRIP_DESTINATION_ERROR]: (state, action) => {
    const { locationString, error } = action.payload;

    return {
      ...state,
      trip: {
        ...state.trip,
        destinationLocation: {
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
