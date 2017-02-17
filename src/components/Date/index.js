import React, { PropTypes } from 'react';
import DeviceInfo from 'react-native-device-info';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Foundation';
import moment from 'moment';
import styles from './styles';

const locale = DeviceInfo.getDeviceLocale();
const isDe = /de/.test(locale);

const makeDateString = date => moment(date).calendar(null, {
  lastDay: isDe ? '[Gestern]' : '[Yesterday]',
  sameDay: isDe ? '[Heute]' : '[Today]',
  nextDay: isDe ? '[Morgen]' : '[Tomorrow]',
  lastWeek: isDe ? '[letzen] dddd' : '[last] dddd',
  nextWeek: 'dddd',
  sameElse: 'L'
});

const Date = ({ date }) => (
  <View style={styles.container}>
    <Icon
      name="calendar"
      style={styles.dateIcon}
      size={20}
    />
    <Text style={[styles.dateText]}>{makeDateString(date)}</Text>
  </View>
);

Date.propTypes = {
  date: PropTypes.string,
};

export default Date;
