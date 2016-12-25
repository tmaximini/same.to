import { NavigationExperimental } from 'react-native';
import { findIndex } from 'lodash';

const { StateUtils } = NavigationExperimental;

const initialState = {
  index: 0,
  routes: [{ key: 'home' }],
};

const actionsMap = {
  // we check here if the requested route is already on our stack, if so, we use  'jumpTo'
  // if not we 'push' it to the stack
  // see https://github.com/facebook/react-native/blob/master/Libraries/NavigationExperimental/NavigationStateUtils.js
  navigate(state, action) {
    console.log('checking key');
    const indexAt = findIndex(state.routes, { key: action.key });
    if (indexAt > -1) {
      console.log('key ' + action.key + ' found! using jumpTo');
      return StateUtils.jumpToIndex(state, indexAt);
    }
    console.log('key ' + action.key + ' not found! using push');
    return StateUtils.push(state, { key: action.key, index: state.index + 1 });
  },
  push(state, action) {
    return StateUtils.push(state, { key: action.key, index: state.index + 1 });
  },
  back(state/*, action*/) {
    return state.index > 0 ? StateUtils.pop(state) : state;
  },
  pop(state/*, action*/) {
    return state.index > 0 ? StateUtils.pop(state) : state;
  }
};

export default (state = initialState, action) => {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
};
