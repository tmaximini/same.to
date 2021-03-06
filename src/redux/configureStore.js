/* eslint global-require: 0 */

import { Platform, AsyncStorage } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
// import createLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { persistStore, autoRehydrate } from 'redux-persist';
import reducer from './modules';

import rootSaga from './sagas';

let purgeFunc = null;

let composeEnhancers = compose;
if (__DEV__) {
  GLOBAL.XMLHttpRequest =
    GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
  // Use it if Remote debugging with RNDebugger, otherwise use remote-redux-devtools
  /* eslint-disable no-underscore-dangle */
  composeEnhancers = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
    require('remote-redux-devtools').composeWithDevTools)({
      name: Platform.OS,
      ...require('../../package.json').remotedev
    });
  /* eslint-enable no-underscore-dangle */
}

const sagaMiddleware = createSagaMiddleware();
// const logger = createLogger();

const middlewares = [sagaMiddleware];
const enhancer = composeEnhancers(
  applyMiddleware(...middlewares),
  autoRehydrate()
);

export default function configureStore(initialState) {
  const store = createStore(reducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept(() => {
      store.replaceReducer(require('./modules').default);
    });
  }

  // run all sagas
  sagaMiddleware.run(rootSaga);
  const persistor = persistStore(store, {
    storage: AsyncStorage,
    whitelist: [
      'auth',
      'events',
      'profile',
      'contacts',
      'chats',
      'editCreateProfile'
    ] // only sync those to offline storage
  });
  // remember persistor object
  purgeFunc = persistor.purge.bind(persistor);
  // persistor.purge(); // uncomment to drop offline data

  return store;
}

// probably call this on logout so next user won't see any unrelated offline content
export const purgeOfflineStorage = () => {
  if (purgeFunc && typeof purgeFunc === 'function') {
    purgeFunc();
  } else {
    console.warn(
      'could not purge offline storage',
      typeof purgeFunc,
      purgeFunc
    );
  }
};
