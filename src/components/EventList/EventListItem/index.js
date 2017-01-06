import React, { PropTypes } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { border } from '../../../utils';
import styles from './styles';

const EventListItem = (props) => (
  <View style={[styles.container, border('#000', 1)]}>
    <View style={styles.wrapper}>
      <TouchableHighlight
        style={styles.hilite}
        onPress={() => Actions.event(...props)}
      >
        <View
          style={styles.main}
        >
          <Text style={styles.title}>
            {`${props.name}`}
          </Text>
          <Text style={styles.button}>
            >
          </Text>
        </View>
      </TouchableHighlight>
      <View style={styles.bottom}>
        <View style={styles.action}><Text>Test</Text></View>
        <View style={styles.action}><Text>Test</Text></View>
      </View>
    </View>

  </View>
);

export default EventListItem;
