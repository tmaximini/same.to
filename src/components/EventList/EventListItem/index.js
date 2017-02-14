import React, { PropTypes } from 'react';
import { Image, View, Text, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import Date from '../../Date';
import Location from '../../Location';
import TagList from '../../TagList';
import { canEdit } from '../../../utils';
import styles from './styles';

const background = require('../../../assets/sunflowers.jpg');

const EventListItem = ({ event, setCurrentEvent, setEvent, setDetail }) => {
  const { name, startAt, location } = event;

  //
  const editEvent = () => {
    setEvent(event);
    Actions.editCreateEvent({ event, title: 'Edit Event' });
  };

  const editActivity = () => {
    setEvent(event);
    Actions.editCreateActivity({ activity: event, title: 'Edit Activity' });
  };

  // set current event in reducer
  const onSelect = () => {
    if (event.type === 'event') {
      setCurrentEvent(event);
      Actions.event({
        onRight: canEdit(event) ? editEvent : undefined,
        rightTitle: canEdit(event) ? 'edit' : undefined,
      });
    } else {
      setDetail({ itemType: 'activity', item: event });
      Actions.activity({
        onRight: canEdit(event) ? editActivity : undefined,
        rightTitle: canEdit(event) ? 'edit' : undefined,
      });
    }
  };

  return (
    <TouchableHighlight
      style={styles.container}
      onPress={onSelect}
      activeOpacity={0.6}
      underlayColor="transparent"
    >
      <Image
        source={background}
        style={styles.bgImage}
      >
        <View style={styles.wrapper}>
          <View style={styles.top}>
            {event.categories && (
              <TagList
                align="flex-start"
                tags={event.categories}
              />
            )}
          </View>
          <View
            style={styles.middle}
          >
            <View
              style={styles.main}
            >
              <View style={styles.headline}>
                <Text style={styles.title}>
                  {name}
                </Text>
                <Icon
                  size={34}
                  name="ios-arrow-forward"
                  style={styles.titleCaret}
                />
              </View>
            </View>
          </View>
          <View style={styles.bottom}>
            {location && (
              <Location
                location={location}
              />
            )}
            {startAt && (
              <Date
                date={startAt}
              />
            )}
          </View>
        </View>
      </Image>
    </TouchableHighlight>
  );
};

EventListItem.propTypes = {
  event: PropTypes.object.isRequired,
  setCurrentEvent: PropTypes.func.isRequired,
  setEvent: PropTypes.func.isRequired,
};

export default EventListItem;
