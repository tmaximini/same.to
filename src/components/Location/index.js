import React, { PropTypes } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

const Location = ({ location, size }) => {

  const string = typeof location === 'string'
    ? location
    : (location.locality || location.formattedAddress);

  return (
    <View style={styles.container}>
      <Icon
        name="map-marker"
        style={styles.locationIcon}
        size={size || 14}
      />
      <Text style={styles.locationText}>{string}</Text>
    </View>
  );
};

Location.propTypes = {
  location: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]),
};

export default Location;
