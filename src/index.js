import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import Router from './Router';
import configureStore from './redux/configureStore';

const store = configureStore();

const sameto = () => (
  <Provider store={store}>
    <Router />
  </Provider>
);

AppRegistry.registerComponent('sameto', () => sameto);
