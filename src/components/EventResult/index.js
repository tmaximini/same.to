import React, { PropTypes } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';

const eventFallback = require('../../assets/Fallback_Event.png');

const EventResult = ({ event, setEvent, bookmarkEvent, unbookmarkEvent }) => (
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
      source={eventFallback}
      style={styles.bgImage}
      borderRadius={5}
    >
      <View style={styles.wrapper}>
        <Text
          style={styles.headline}
          numberOfLines={1}
        >
          {event.name}
        </Text>

        <TouchableHighlight
          underlayColor="transparent"
          activeOpacity={0.6}
          style={styles.bookmark}
          onPress={() => event.isBookmark ? unbookmarkEvent(event) : bookmarkEvent(event)}
        >
          <Icon
            name={event.isBookmark ? 'ios-bookmark' : 'ios-bookmark-outline'}
            size={22}
            style={styles.icon}
          />
        </TouchableHighlight>
      </View>
    </Image>
  </TouchableHighlight>
);

EventResult.propTypes = {
  event: PropTypes.object.isRequired,
  setEvent: PropTypes.func.isRequired,
  bookmarkEvent: PropTypes.func.isRequired,
  unbookmarkEvent: PropTypes.func.isRequired,
};

export default EventResult;
