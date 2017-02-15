import React, { PropTypes } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

const EventResult = ({ event }) => (
  <View style={styles.container}>
    <Text style={styles.headline}>{event.name}</Text>
  </View>
);

EventResult.propTypes = {
  event: PropTypes.object.isRequired,
};

export default EventResult;
