import React, { Component, PropTypes } from 'react';
import { Image, View, Text, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';
import Date from '../../Date';
import Location from '../../Location';
import styles from './styles';

const background = require('../../../assets/sunflowers.jpg');

export default class EventListItem extends Component {

  static propTypes = {
    event: PropTypes.object.isRequired,
  }

  render() {
    const { name, type, startAt, location } = this.props.event;

    const { locality, formattedAddress } = location;

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

            </View>


            <TouchableHighlight
              style={styles.middle}
              onPress={() => Actions.event({ title: name, event: this.props.event })}
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
  }

}

