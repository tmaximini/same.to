/**
 * because all detail views are very similar, I use a shared redux and view for all of them
 */

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
};


// Reducer
export default (state = initialState, action) => {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
};
