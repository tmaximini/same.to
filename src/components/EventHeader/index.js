import React, { PropTypes } from 'react';
import { View, Text, Image } from 'react-native';
import styles from './styles';

const EventHeader = ({ event, background }) => (
  <Image
    style={styles.bgImage}
    source={background}
  >
    <View style={styles.header}>
      <Text style={styles.title}>
        {event.name}
      </Text>
    </View>
  </Image>
);

EventHeader.propTypes = {
  event: PropTypes.object.isRequired,
};

export default EventHeader;
