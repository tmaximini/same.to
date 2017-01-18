import React, { Component, PropTypes } from 'react';
import {
  View,
} from 'react-native';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import EventList from '../../components/EventList';
import PlusButton from '../../components/PlusButton';

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
        <PlusButton
          itemSize={45}
          radius={80}
          startDegree={225}
          endDegree={315}
          items={[
            { title: 'event', action: Actions.editCreateEvent, icon: 'compass' },
            { title: 'activity', action: Actions.editCreateEvent, icon: 'coffee' }
          ]}
        />
      </View>
    );
  }
}
