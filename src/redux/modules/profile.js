// Initial State
const initialState = {
  firstName: null,
  lastName: null,
  email: null,
  avatar: null,
  gender: null,
  employer: null,
  job: null,
  interests: []
};


// Constants
export const UPDATE = 'profile/UPDATE';


// Action Creators
export const update = (key, value) => ({
  type: UPDATE,
  payload: {
    key,
    value
  }
});


// export all actions
export const actions = {
  update
};


// Action Handlers
const actionsMap = {
  [UPDATE]: (state, action) => Object.assign(state, { [action.payload.key]: action.payload.value }),
};


// Reducer
export default (state = initialState, action) => {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
};
