/**
 * because all detail views are very similar, I use a shared redux and view for all of them
 */
import _ from 'lodash';
import {
  UPDATE_TRIP_SUCCESS,
} from './editCreateTrip';
import {
  UPDATE_ACTIVITY_SUCCESS
} from './editCreateActivity';
import {
  UPDATE_ACCOMMODATION_SUCCESS
} from './editCreateAccommodation';
import {
  ADD_CONTACT_SUCCESS,
  REMOVE_CONTACT_SUCCESS,
  ADD_FAVORITE_SUCCESS,
  REMOVE_FAVORITE_SUCCESS,
} from './contacts';

// Initial State
const initialState = {
  item: {},
  itemType: null,
};


// Constants (Actions)
export const SET_ITEM = 'detail/SET_ITEM';
export const TOGGLE_PARTICIPATE_START = 'detail/TOGGLE_PARTICIPATE_START';
export const TOGGLE_PARTICIPATE_SUCCESS = 'detail/TOGGLE_PARTICIPATE_SUCCESS';
export const TOGGLE_PARTICIPATE_ERROR = 'detail/TOGGLE_PARTICIPATE_ERROR';



// Action Creators
export const toggleParticipate = ({ itemType, item }) => ({
  type: TOGGLE_PARTICIPATE_START,
  payload: {
    item,
    itemType,
  }
});


export const setDetail = ({ itemType, item }) => ({
  type: SET_ITEM,
  payload: {
    itemType,
    item,
  }
});


// export all actions
export const actions = {
  toggleParticipate,
  setDetail,
};


const updateItem = (item, id, valuesToUpdate) => {
  const newItem = Object.assign({}, item);
  const index = _.findIndex(newItem.members, { id });
  if (index !== -1) {
    newItem.members[index] = { ...newItem.members[index], ...valuesToUpdate };
  }

  return newItem;
};


// Action Handlers
const actionsMap = {
  [SET_ITEM]: (state, action) => {
    const { itemType, item } = action.payload;

    return {
      ...state,
      item,
      itemType,
    };
  },
  [TOGGLE_PARTICIPATE_SUCCESS]: (state, action) => {
    const { item } = action.payload;

    return {
      ...state,
      item,
    };
  },
  [TOGGLE_PARTICIPATE_ERROR]: (state, action) => {
    const { item } = action.payload;

    return {
      ...state,
      item,
    };
  },
  [UPDATE_ACCOMMODATION_SUCCESS]: (state, action) => ({
    ...state,
    item: action.payload.accommodation,
  }),
  [UPDATE_TRIP_SUCCESS]: (state, action) => ({
    ...state,
    item: action.payload.trip,
  }),
  [UPDATE_ACTIVITY_SUCCESS]: (state, action) => ({
    ...state,
    item: action.payload.activity,
  }),
  [ADD_CONTACT_SUCCESS]: (state, action) => {
    const { contact } = action.payload;
    const newItem = updateItem(state.item, contact.id, { isContact: true });

    return {
      ...state,
      item: newItem,
    };
  },
  [ADD_FAVORITE_SUCCESS]: (state, action) => {
    const { contact } = action.payload;
    const newItem = updateItem(state.item, contact.id, { isFavorite: true });

    return {
      ...state,
      item: newItem,
    };
  },
  [REMOVE_CONTACT_SUCCESS]: (state, action) => {
    const { id } = action.payload;
    const newItem = updateItem(state.item, id, { isContact: false });

    return {
      ...state,
      item: newItem,
    };
  },
  [REMOVE_FAVORITE_SUCCESS]: (state, action) => {
    const { id } = action.payload;
    const newItem = updateItem(state.item, id, { isFavorite: false });

    return {
      ...state,
      item: newItem,
    };
  },
};


// Reducer
export default (state = initialState, action) => {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
};
