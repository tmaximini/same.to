import React, { PropTypes } from 'react';
import { View, Text } from 'react-native';

import { border } from '../../../utils';

import styles from './styles';

const EventListItem = (props) => (
  <View style={[styles.container, border('#000', 1)]}>
    <View style={styles.wrapper}>
      <View style={styles.main}>
        <Text style={styles.title}>
          {`${props.name}`}
        </Text>
        <Text style={styles.button}>
          >
        </Text>
      </View>
      <View style={styles.bottom}>
        <View style={styles.action}><Text>Test</Text></View>
        <View style={styles.action}><Text>Test</Text></View>
      </View>
    </View>

  </View>
);

export default EventListItem;
