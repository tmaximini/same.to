import React, { PropTypes } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';

const Location = ({ location }) => {

  const string = typeof location === 'string'
    ? location
    : (location.locality || location.formattedAddress);

  return (
    <View style={styles.container}>
      <Icon
        name="ios-navigate-outline"
        style={styles.locationIcon}
      />
      <Text style={styles.locationText}>{string}</Text>
    </View>
  );
};

Location.propTypes = {
  location: PropTypes.oneOf(
    PropTypes.object,
    PropTypes.string
  ),
};

export default Location;
