import React, { Component, PropTypes } from 'react';
import { Image, View, Text, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';
import { formatDate } from '../../../utils';
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
              <View style={styles.date}>
                <Icon name="ios-calendar-outline" style={styles.icon} />
                <View style={styles.dateText}>
                  <Text style={styles.text}>{formatDate(startAt)}</Text>
                </View>

              </View>
              <View style={styles.location}>
                <Icon name="ios-navigate-outline" style={styles.icon} />
                <View style={styles.locationText}>
                  <Text style={styles.text}>{locality || formattedAddress}</Text>
                </View>
              </View>
            </View>
          </View>
        </Image>
      </View>
    );
  }

}

