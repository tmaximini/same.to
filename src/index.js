import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import moment from 'moment';
import 'moment/locale/de';
import configureStore from './redux/configureStore';
import Routes from './Routes';

moment.locale(DeviceInfo.getDeviceLocale());
const store = configureStore();

const sameto = () => (
  <Provider store={store}>
    <Routes />
  </Provider>
);

AppRegistry.registerComponent('sameto', () => sameto);
