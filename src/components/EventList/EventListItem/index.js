import React, { PropTypes } from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

const EventListItem = (props) => (
  <View style={styles.container}>
    <Text style={styles.text}>
      {`${props.name}`}
    </Text>
  </View>
);

export default EventListItem;
