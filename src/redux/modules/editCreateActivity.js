import { formatDate, toggleArrayItem } from '../../utils';


const makeDefaultActivity = () => ({
  startAt: formatDate(new Date()),
  name: '',
  location: {},
  type: 'activity',
  categories: [],
  isPublic: true,
});

// Initial State
const initialState = {
  activity: makeDefaultActivity(),
  errors: {},
  activityTypes: ['party', 'gaming', 'shopping', 'concert', 'cinema', 'dinner', 'sport', 'gameing'],
  locationString: null,
};


// Constants (Actions)

// edit
export const UPDATE_ACTIVITY_START = 'editActivity/UPDATE_ACTIVITY_START';
export const UPDATE_ACTIVITY_SUCCESS = 'editActivity/UPDATE_ACTIVITY_SUCCESS';
export const UPDATE_ACTIVITY_ERROR = 'editActivity/UPDATE_ACTIVITY_ERROR';
export const UPDATE_ACTIVITY = 'editActivity/UPDATE_ACTIVITY';
export const SET_ACTIVITY = 'editActivity/SET_ACTIVITY';
export const RESET_ACTIVITY = 'editActivity/RESET_ACTIVITY';
export const TOGGLE_CATEGORY = 'editActivity/TOGGLE_CATEGORY';
export const GEOCODE_ACTIVITY_START = 'editActivity/GEOCODE_ACTIVITY_START';
export const GEOCODE_ACTIVITY_SUCCESS = 'editActivity/GEOCODE_ACTIVITY_SUCCESS';
export const GEOCODE_ACTIVITY_ERROR = 'editActivity/GEOCODE_ACTIVITY_ERROR';

// create
export const CREATE_ACTIVITY_START = 'createActivity/CREATE_ACTIVITY_START';
export const CREATE_ACTIVITY_SUCCESS = 'createActivity/CREATE_ACTIVITY_SUCCESS';
export const CREATE_ACTIVITY_ERROR = 'createActivity/CREATE_ACTIVITY_ERROR';

// delete
export const DELETE_ACTIVITY_START = 'createActivity/DELETE_ACTIVITY_START';
export const DELETE_ACTIVITY_SUCCESS = 'createActivity/DELETE_ACTIVITY_SUCCESS';
export const DELETE_ACTIVITY_ERROR = 'createActivity/DELETE_ACTIVITY_ERROR';

// types
export const GET_ACTIVITY_TYPES_START = 'createActivity/GET_ACTIVITY_TYPES_START';
export const GET_ACTIVITY_TYPES_SUCCESS = 'createActivity/GET_ACTIVITY_TYPES_SUCCESS';
export const GET_ACTIVITY_TYPES_ERROR = 'createActivity/GET_ACTIVITY_TYPES_ERROR';



// Action Creators
export const updateRemoteActivity = updatedActivity => ({
  type: UPDATE_ACTIVITY_START,
  payload: updatedActivity
});

// updates any key/value pair for a new Activity
export const updateActivity = (key, value) => ({
  type: UPDATE_ACTIVITY,
  payload: {
    key,
    value
  }
});

export const setActivity = model => ({
  type: SET_ACTIVITY,
  payload: {
    model
  }
});

export const resetActivity = () => ({
  type: RESET_ACTIVITY,
});

export const getTypes = () => ({
  type: GET_ACTIVITY_TYPES_START,
});

export const toggleCategory = key => ({
  type: TOGGLE_CATEGORY,
  payload: {
    key,
  }
});

export const createActivity = (newActivityData, eventId) => ({
  type: CREATE_ACTIVITY_START,
  payload: {
    data: newActivityData,
    eventId,
  },
});

export const deleteActivity = activity => ({
  type: CREATE_ACTIVITY_START,
  payload: activity,
});

export const geocodeLocation = location => ({
  type: GEOCODE_ACTIVITY_START,
  payload: {
    location,
    successAction: GEOCODE_ACTIVITY_SUCCESS,
    errorAction: GEOCODE_ACTIVITY_ERROR,
  }
});



// export all actions
export const actions = {
  updateRemoteActivity,
  createActivity,
  setActivity,
  toggleCategory,
  updateActivity,
  geocodeLocation,
  resetActivity,
  getTypes,
  deleteActivity,
};


// Action Handlers
const actionsMap = {
  [GET_ACTIVITY_TYPES_SUCCESS]: (state, action) => ({
    ...state,
    activityTypes: action.payload,
  }),
  [CREATE_ACTIVITY_SUCCESS]: (state) => ({
    ...state,
    activity: makeDefaultActivity(),
  }),
  [UPDATE_ACTIVITY_SUCCESS]: (state, action) => ({
    ...state,
    activity: action.payload.activity,
  }),
  [RESET_ACTIVITY]: (state) => ({
    ...state,
    activity: makeDefaultActivity(),
  }),
  [TOGGLE_CATEGORY]: (state, action) => {
    const { key } = action.payload;

    return {
      ...state,
      activity: {
        ...state.activity,
        categories: toggleArrayItem(state.activity.categories, key)
      }
    };
  },
  [SET_ACTIVITY]: (state, action) => {
    const { model } = action.payload;

    return {
      ...state,
      activity: model,
      locationString: model.location ? model.location.formattedAddress : '',
    };
  },
  [UPDATE_ACTIVITY]: (state, action) => {
    const { key, value } = action.payload;
    const activity = {
      ...state.activity,
      [key]: value
    };

    return {
      ...state,
      activity,
    };
  },
  [GEOCODE_ACTIVITY_SUCCESS]: (state, action) => ({
    ...state,
    activity: {
      ...state.activity,
      location: action.payload,
    },
  }),
  [GEOCODE_ACTIVITY_ERROR]: (state, action) => {
    const { locationString, error } = action.payload;

    return {
      ...state,
      activity: {
        ...state.activity,
        location: {
          formattedAddress: locationString,
        },
      },
      errors: {
        ...state.errors,
        activity: error,
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
