import React, { PropTypes } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { formatDate } from '../../utils';
import styles from './styles';

const Date = ({ date }) => (
  <View style={styles.container}>
    <Icon
      name="ios-calendar-outline"
      style={styles.dateIcon}
    />
    <Text style={styles.dateText}>{formatDate(date)}</Text>
  </View>
);

Date.propTypes = {
  date: PropTypes.string,
};

export default Date;
