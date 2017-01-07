import React, { Component, PropTypes } from 'react';
import {
  View,
  TouchableHighlight,
  Text
} from 'react-native';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import EventList from '../../components/EventList';

import { actions as eventActions } from '../../redux/modules/events';
import styles from './styles';

@connect(
  state => ({
    events: state.events.events,
    isRefreshing: state.events.isFetching,
    loggedIn: state.auth.loggedIn,
  }),
  eventActions,
)
export default class Home extends Component {

  static propTypes = {
    fetchEvents: PropTypes.func.isRequired,
    title: PropTypes.string,
    loggedIn: PropTypes.bool.isRequired,
    isRefreshing: PropTypes.bool.isRequired,
    events: PropTypes.arrayOf(PropTypes.object)
  };

  render() {
    const {
      events,
      fetchEvents,
      isRefreshing,
    } = this.props;

    return (
      <View style={styles.container}>
        <EventList
          events={events}
          refresh={fetchEvents}
          isRefreshing={isRefreshing}
        />
        <View style={styles.buttons}>
          <TouchableHighlight
            style={styles.newButton}
            onPress={Actions.newEvent}
          >
            <View style={styles.plus}>
              <Text style={styles.plusText}>+</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
