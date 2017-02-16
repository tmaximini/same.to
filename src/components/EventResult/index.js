import React, { PropTypes } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import styles from './styles';

const background = require('../../assets/sunflowers.jpg');

const EventResult = ({ event, setEvent }) => (
  <TouchableHighlight
    style={styles.container}
    underlayColor="transparent"
    activeOpacity={0.6}
    onPress={() => {
      setEvent(event);
      Actions.event({ event });
    }}
  >
    <Image
      source={background}
      style={styles.bgImage}
    >
      <View style={styles.wrapper}>
        <Text style={styles.headline}>{event.name}</Text>
      </View>
    </Image>
  </TouchableHighlight>
);

EventResult.propTypes = {
  event: PropTypes.object.isRequired,
  setEvent: PropTypes.func.isRequired,
};

export default EventResult;
