import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import I18n from 'react-native-i18n';
import moment from 'moment';
import 'moment/locale/de';
import translations from './i18n';
import configureStore from './redux/configureStore';
import Routes from './Routes';


// i18n setup
I18n.fallbacks = true;
I18n.translations = translations;
moment.locale(DeviceInfo.getDeviceLocale());

console.log('DeviceInfo.getDeviceLocale()', DeviceInfo.getDeviceLocale(), I18n.currentLocale());

const store = configureStore();

const sameto = () => (
  <Provider store={store}>
    <Routes />
  </Provider>
);

AppRegistry.registerComponent('sameto', () => sameto);
