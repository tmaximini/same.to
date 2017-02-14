import React, { PropTypes } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Foundation';
import moment from 'moment';
import styles from './styles';

const makeDateString = date => moment(date).calendar(null, {
  lastDay: '[Yesterday]',
  sameDay: '[Today]',
  nextDay: '[Tomorrow]',
  lastWeek: '[last] dddd',
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
