import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';

import Routes from './Routes';


const store = configureStore();

const sameto = () => (
  <Provider store={store}>
    <Routes />
  </Provider>
);

AppRegistry.registerComponent('sameto', () => sameto);
