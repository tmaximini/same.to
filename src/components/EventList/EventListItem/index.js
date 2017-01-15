import React, { PropTypes } from 'react';
import { Image, View, Text, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Date from '../../Date';
import Location from '../../Location';
import TagList from '../../TagList';
import styles from './styles';

const background = require('../../../assets/sunflowers.jpg');

const EventListItem = ({ event }) => {
  const { name, startAt, location } = event;

  return (
    <View
      style={styles.container}
      source={background}
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


          <TouchableHighlight
            style={styles.middle}
            onPress={() => Actions.event({ title: name, event })}
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
          </TouchableHighlight>
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
    </View>
  );
};

EventListItem.propTypes = {
  event: PropTypes.object,
};

export default EventListItem;
