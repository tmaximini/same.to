import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider, connect } from 'react-redux';
import configureStore from './redux/configureStore';

import Routes from './Routes';

const RoutesContainer = connect()(Routes);
const store = configureStore();

const sameto = () => (
  <Provider store={store}>
    <RoutesContainer>
      <Routes />
    </RoutesContainer>
  </Provider>
);

AppRegistry.registerComponent('sameto', () => sameto);
