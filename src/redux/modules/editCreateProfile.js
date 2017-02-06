// Initial State
const makeDefaultProfile = () => ({
  username: null,
  firstName: null,
  lastName: null,
  email: null,
  avatar: null,
  gender: null,
  employer: null,
  occupation: null,
  interests: [],
  uploadedImage: null,
  location: {},
});

const initialState = {
  profile: makeDefaultProfile(),
  locationString: null,
  errors: null,
  isNew: true,
};


// Constants
export const CREATE_PROFILE_START = 'profile/CREATE_PROFILE_START';
export const CREATE_PROFILE_SUCCESS = 'profile/CREATE_PROFILE_SUCCESS';
export const CREATE_PROFILE_ERROR = 'profile/CREATE_PROFILE_ERROR';
export const UPDATE_PROFILE_START = 'profile/UPDATE_PROFILE_START';
export const UPDATE_PROFILE_SUCCESS = 'profile/UPDATE_PROFILE_SUCCESS';
export const UPDATE_PROFILE_ERROR = 'profile/UPDATE_PROFILE_ERROR';
export const UPDATE_PROFILE = 'profile/UPDATE_PROFILE';
export const SET_PROFILE = 'profile/SET_PROFILE';
export const RESET_PROFILE = 'profile/RESET_PROFILE';
export const GEOCODE_PROFILE_START = 'profile/GEOCODE_PROFILE_START';
export const GEOCODE_PROFILE_SUCCESS = 'profile/GEOCODE_PROFILE_SUCCESS';
export const GEOCODE_PROFILE_ERROR = 'profile/GEOCODE_PROFILE_ERROR';


// Action Creators
export const update = (key, value) => ({
  type: UPDATE_PROFILE,
  payload: {
    key,
    value,
  }
});

export const updateRemoteProfile = profile => ({
  type: UPDATE_PROFILE_START,
  payload: {
    ...profile
  }
});


export const setProfile = model => ({
  type: SET_PROFILE,
  payload: {
    model
  }
});

export const geocodeLocation = location => ({
  type: GEOCODE_PROFILE_START,
  payload: {
    location,
    successAction: GEOCODE_PROFILE_SUCCESS,
    errorAction: GEOCODE_PROFILE_ERROR,
  }
});



// export all actions
export const actions = {
  update,
  setProfile,
  geocodeLocation,
  updateRemoteProfile,
};


// Action Handlers
const actionsMap = {
  [CREATE_PROFILE_SUCCESS]: (state) => ({
    ...state,
    profile: makeDefaultProfile(),
    isNew: true,
  }),
  [UPDATE_PROFILE_SUCCESS]: (state) => ({
    ...state,
    profile: makeDefaultProfile(),
    isNew: true,
  }),
  [RESET_PROFILE]: (state) => ({
    ...state,
    profile: makeDefaultProfile(),
    isNew: true,
  }),
  [SET_PROFILE]: (state, action) => {
    const { model } = action.payload;

    return {
      ...state,
      profile: model,
      locationString: model.location ? model.location.formattedAddress : '',
      isNew: false,
    };
  },
  [UPDATE_PROFILE]: (state, action) => {
    const { key, value } = action.payload;
    const profile = {
      ...state.profile,
      [key]: value
    };

    return {
      ...state,
      profile,
    };
  },
  [GEOCODE_PROFILE_SUCCESS]: (state, action) => ({
    ...state,
    profile: {
      ...state.profile,
      location: action.payload,
    },
  }),
  [GEOCODE_PROFILE_ERROR]: (state, action) => {
    const { locationString, error } = action.payload;

    return {
      ...state,
      locationString,
      errors: {
        ...state.errors,
        profile: error,
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
