import { formatDate } from '../../utils';


const makeDefaultAccommodation = () => ({
  startAt: formatDate(new Date()),
  endAt: formatDate(new Date()),
  location: {},
});

// Initial State
const initialState = {
  accommodation: {},
  errors: {},
  accommodationTypes: ['car', 'airplane', 'train', 'bus', 'taxi', 'driver'],
  pickupString: null,
};


// Constants (Actions)

// edit
export const UPDATE_ACCOMMODATION_START = 'editAccommodation/UPDATE_ACCOMMODATION_START';
export const UPDATE_ACCOMMODATION_SUCCESS = 'editAccommodation/UPDATE_ACCOMMODATION_SUCCESS';
export const UPDATE_ACCOMMODATION_ERROR = 'editAccommodation/CREATE_ACCOMMODATION_ERROR';
export const UPDATE_ACCOMMODATION = 'editAccommodation/UPDATE_ACCOMMODATION';
export const SET_ACCOMMODATION = 'editAccommodation/SET_NEW_ACCOMMODATION';
export const GEOCODE_ACCOMMODATION_START = 'editAccommodation/GEOCODE_ACCOMMODATION_START';
export const GEOCODE_ACCOMMODATION_SUCCESS = 'editAccommodation/GEOCODE_ACCOMMODATION_SUCCESS';
export const GEOCODE_ACCOMMODATION_ERROR = 'editAccommodation/GEOCODE_ACCOMMODATION_ERROR';

// create
export const CREATE_ACCOMMODATION_START = 'createAccommodation/CREATE_ACCOMMODATION_START';
export const CREATE_ACCOMMODATION_SUCCESS = 'createAccommodation/CREATE_ACCOMMODATION_SUCCESS';
export const CREATE_ACCOMMODATION_ERROR = 'createAccommodation/CREATE_ACCOMMODATION_ERROR';



// Action Creators
export const updateRemoteAccommodation = updateAccommodation => ({
  type: UPDATE_ACCOMMODATION_START,
  payload: updateAccommodation
});

// updates any key/value pair for a new Accommodation
export const updateAccommodation = (key, value) => ({
  type: UPDATE_ACCOMMODATION,
  payload: {
    key,
    value
  }
});

export const setAccommodation = model => ({
  type: SET_ACCOMMODATION,
  payload: {
    model
  }
});

export const createAccommodation = newAccommodationData => ({
  type: CREATE_ACCOMMODATION_START,
  payload: newAccommodationData
});



export const geocodeLocation = location => ({
  type: GEOCODE_ACCOMMODATION_START,
  payload: {
    location,
    successAction: GEOCODE_ACCOMMODATION_SUCCESS,
    errorAction: GEOCODE_ACCOMMODATION_ERROR,
  }
});



// export all actions
export const actions = {
  updateRemoteAccommodation,
  createAccommodation,
  setAccommodation,
  updateAccommodation,
  geocodeLocation,
};


// Action Handlers
const actionsMap = {
  [CREATE_ACCOMMODATION_SUCCESS]: (state) => ({
    ...state,
    accommodation: makeDefaultAccommodation(),
  }),
  [UPDATE_ACCOMMODATION_SUCCESS]: (state) => ({
    ...state,
    accommodation: {},
  }),
  [SET_ACCOMMODATION]: (state, action) => {
    const { model } = action.payload;

    console.log('accommodation', model);

    return {
      ...state,
      accommodation: model,
      pickupString: model.pickupLocation ? model.pickupLocation.formattedAddress : '',
      destinationString: model.destinationLocation ? model.destinationLocation.formattedAddress : '',
    };
  },
  [UPDATE_ACCOMMODATION]: (state, action) => {
    const { key, value } = action.payload;
    const accommodation = {
      ...state.accommodation,
      [key]: value
    };

    return {
      ...state,
      accommodation,
    };
  },
  [GEOCODE_ACCOMMODATION_SUCCESS]: (state, action) => ({
    ...state,
    accommodation: {
      ...state.accommodation,
      pickupLocation: action.payload,
    },
  }),
  [GEOCODE_ACCOMMODATION_ERROR]: (state, action) => {
    const { locationString, error } = action.payload;

    return {
      ...state,
      accommodation: {
        ...state.accommodation,
        pickupLocation: {
          formattedAddress: locationString,
        },
      },
      errors: {
        ...state.errors,
        accommodation: error,
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
