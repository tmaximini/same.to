import { formatDate, toggleArrayItem } from '../../utils';


const makeDefaultAccommodation = () => ({
  startAt: formatDate(new Date()),
  endAt: formatDate(new Date()),
  location: {},
  categories: [],
  isPublic: false,
});

// Initial State
const initialState = {
  accommodation: makeDefaultAccommodation(),
  errors: {},
  accommodationTypes: ['hotel', 'hostal', 'house', 'appartment', 'camping', 'other'],
  locationString: null,
  isNew: true,
};


// Constants (Actions)

// edit
export const UPDATE_ACCOMMODATION_START = 'editAccommodation/UPDATE_ACCOMMODATION_START';
export const UPDATE_ACCOMMODATION_SUCCESS = 'editAccommodation/UPDATE_ACCOMMODATION_SUCCESS';
export const UPDATE_ACCOMMODATION_ERROR = 'editAccommodation/CREATE_ACCOMMODATION_ERROR';
export const UPDATE_ACCOMMODATION = 'editAccommodation/UPDATE_ACCOMMODATION';
export const SET_ACCOMMODATION = 'editAccommodation/SET_ACCOMMODATION';
export const RESET_ACCOMMODATION = 'editAccommodation/RESET_ACCOMMODATION';
export const TOGGLE_CATEGORY = 'editAccommodation/TOGGLE_CATEGORY';
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


export const resetAccommodation = () => ({
  type: RESET_ACCOMMODATION,
});

export const toggleCategory = key => ({
  type: TOGGLE_CATEGORY,
  payload: {
    key,
  }
});

export const createAccommodation = (newAccommodationData, eventId) => ({
  type: CREATE_ACCOMMODATION_START,
  payload: {
    data: newAccommodationData,
    eventId,
  },
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
  toggleCategory,
  updateAccommodation,
  geocodeLocation,
  resetAccommodation,
};


// Action Handlers
const actionsMap = {
  [CREATE_ACCOMMODATION_SUCCESS]: (state) => ({
    ...state,
    accommodation: makeDefaultAccommodation(),
    isNew: true,
  }),
  [UPDATE_ACCOMMODATION_SUCCESS]: (state) => ({
    ...state,
    accommodation: makeDefaultAccommodation(),
    isNew: true,
  }),
  [RESET_ACCOMMODATION]: (state) => ({
    ...state,
    accommodation: makeDefaultAccommodation(),
    isNew: true,
  }),
  [TOGGLE_CATEGORY]: (state, action) => {
    const { key } = action.payload;

    return {
      ...state,
      accommodation: {
        ...state.accommodation,
        categories: toggleArrayItem(state.accommodation.categories, key)
      }
    };
  },
  [SET_ACCOMMODATION]: (state, action) => {
    const { model } = action.payload;

    return {
      ...state,
      accommodation: model,
      locationString: model.pickupLocation ? model.pickupLocation.formattedAddress : '',
      isNew: false,
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
