/* eslint global-require: 0 */

import { Platform } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './modules';

let composeEnhancers = compose;
if (__DEV__) {
  // Use it if Remote debugging with RNDebugger, otherwise use remote-redux-devtools
  /* eslint-disable no-underscore-dangle */
  composeEnhancers = (
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
    require('remote-redux-devtools').composeWithDevTools
  )({
    name: Platform.OS,
    ...require('../../package.json').remotedev,
  });
  /* eslint-enable no-underscore-dangle */
}

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
);

export default function configureStore(initialState) {
  const store = createStore(reducer, initialState, enhancer);
  if (module.hot) {
    module.hot.accept(() => {
      store.replaceReducer(require('./modules').default);
    });
  }
  return store;
}
