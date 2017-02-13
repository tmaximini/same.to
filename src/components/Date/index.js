import React, { PropTypes } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import styles from './styles';

const Date = ({ date, size }) => (
  <View style={styles.container}>
    <Icon
      name="calendar"
      style={styles.dateIcon}
      size={size || 14}
    />
    <Text style={styles.dateText}>{moment(date).calendar()}</Text>
  </View>
);

Date.propTypes = {
  date: PropTypes.string,
  size: PropTypes.number,
};

export default Date;
