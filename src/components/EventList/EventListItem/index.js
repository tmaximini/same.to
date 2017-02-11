import React, { PropTypes } from 'react';
import { Image, View, Text, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Date from '../../Date';
import Location from '../../Location';
import TagList from '../../TagList';
import { canEdit } from '../../../utils';
import styles from './styles';

const background = require('../../../assets/sunflowers.jpg');

const EventListItem = ({ event, setCurrentEvent, setEvent }) => {
  const { name, startAt, location } = event;

  //
  const editEvent = () => {
    setEvent(event);
    Actions.editCreateEvent({ event, title: 'Edit Event' });
  };

  // set current event in reducer
  const onSelect = () => {
    setCurrentEvent(event);
    Actions.event({
      title: name,
      onRight: canEdit(event) ? editEvent : undefined,
      rightTitle: canEdit(event) ? 'edit' : undefined,
    });
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
            <TagList
              tags={[event.type]}
            />
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
                <Text style={styles.button}>
                  >
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.bottom}>
            <Date
              date={startAt}
            />
            <Location
              location={location}
            />
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
