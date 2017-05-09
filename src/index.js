import React from 'react';
import { AppRegistry, View } from 'react-native';
import { Provider } from 'react-redux';
import { ActionSheetProvider } from '@exponent/react-native-action-sheet';
import DeviceInfo from 'react-native-device-info';
import I18n from 'react-native-i18n';
import moment from 'moment';
import 'moment/locale/de';
import wrapWithFCM from './hocs/FCM';
import translations from './i18n';
import configureStore from './redux/configureStore';
import Routes from './Routes';

import ListDemo from './demos/tempList';

// i18n setup
const locale = DeviceInfo.getDeviceLocale();
I18n.fallbacks = true;
I18n.translations = translations;
moment.locale(locale);
I18n.locale = locale;

const store = configureStore();

const sameto = () => (
  <ActionSheetProvider>
    <Provider store={store}>
      <Routes />
    </Provider>
  </ActionSheetProvider>
);

const extended = wrapWithFCM(sameto);

AppRegistry.registerComponent('sameto', () => extended);
