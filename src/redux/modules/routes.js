import { NavigationExperimental } from 'react-native';
import { findIndex } from 'lodash';

const { StateUtils } = NavigationExperimental;

// initial state
const initialState = {
  index: 0,
  routes: [{ key: 'home' }],
};


// constants
export const NAVIGATE = 'routes/NAVIGATE';
export const GO_BACK = 'routes/GO_BACK';


// action creators
export const navigate = (key, ...rest) => ({
  type: NAVIGATE,
  payload: {
    key,
    ...rest
  }
});

export const goBack = () => ({
  type: GO_BACK
});


// all actions
export const actions = {
  navigate,
  goBack
};


// action handlers
const actionsMap = {
  // we check here if the requested route is already on our stack, if so, we use  'jumpTo'
  // if not we 'push' it to the stack
  // see https://github.com/facebook/react-native/blob/master/Libraries/NavigationExperimental/NavigationStateUtils.js
  [NAVIGATE]: (state, action) => {
    const indexAt = findIndex(state.routes, { key: action.payload.key });
    if (indexAt > -1) {
      return StateUtils.jumpToIndex(state, indexAt);
    }
    return StateUtils.push(state, { key: action.payload.key, index: state.index + 1 });
  },
  push(state, action) {
    return StateUtils.push(state, { key: action.key, index: state.index + 1 });
  },
  [GO_BACK]: (state) => {
    return state.index > 0 ? StateUtils.pop(state) : state;
  },
  pop(state/*, action*/) {
    return state.index > 0 ? StateUtils.pop(state) : state;
  }
};


// reducer
export default (state = initialState, action) => {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
};
