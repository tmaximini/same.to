/* eslint global-require: 0 */

import { Platform } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
// import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import reducer from './modules';

import rootSaga from './sagas';

let composeEnhancers = compose;
if (__DEV__) {
  GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
  // Use it if Remote debugging with RNDebugger, otherwise use remote-redux-devtools
  /* eslint-disable no-underscore-dangle */
  composeEnhancers = (
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    || require('remote-redux-devtools').composeWithDevTools
  )({
    name: Platform.OS,
    ...require('../../package.json').remotedev,
  });
  /* eslint-enable no-underscore-dangle */
}

const sagaMiddleware = createSagaMiddleware();
const middlewares = [
  sagaMiddleware,
];
const enhancer = composeEnhancers(
  applyMiddleware(...middlewares),
);


export default function configureStore(initialState) {
  const store = createStore(
    reducer,
    initialState,
    enhancer
  );

  if (module.hot) {
    module.hot.accept(() => {
      store.replaceReducer(require('./modules').default);
    });
  }

  // run all sagas
  sagaMiddleware.run(rootSaga);

  return store;
}
