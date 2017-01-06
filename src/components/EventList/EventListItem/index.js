import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { border, formatDate } from '../../../utils';
import styles from './styles';

export default class EventListItem extends Component {

  static propTypes = {
    event: PropTypes.object.isRequired,
  }

  render() {
    const { name, type, startAt } = this.props.event;

    return (
      <View style={[styles.container, border('#000', 1)]}>
        <View style={styles.wrapper}>
          <TouchableHighlight
            style={styles.hilite}
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
              <View style={styles.extraInfo}>
                <Text style={styles.type}>{type}</Text>
              </View>
            </View>
          </TouchableHighlight>
          <View style={styles.bottom}>
            <View style={styles.action}><Text>{formatDate(startAt)}</Text></View>
            <View style={styles.action}><Text>Test</Text></View>
          </View>
        </View>

      </View>
    );
  }

}

