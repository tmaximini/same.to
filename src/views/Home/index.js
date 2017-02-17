import React, { Component, PropTypes } from 'react';
import {
  View,
} from 'react-native';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import EventList from '../../components/EventList';
import PlusButton from '../../components/PlusButton';

import { actions as eventActions } from '../../redux/modules/events';
import {
  resetEvent as resetEventAction,
  setEvent as setEventAction
} from '../../redux/modules/editCreateEvent';
import {
  setDetail as setDetailAction,
} from '../../redux/modules/detail';
import { resetActivity as resetActivityAction } from '../../redux/modules/editCreateActivity';
import styles from './styles';

@connect(
  state => ({
    events: state.events.events,
    isRefreshing: state.events.isFetching,
    loggedIn: state.auth.loggedIn,
  }),
  {
    ...eventActions,
    resetEvent: resetEventAction,
    resetActivity: resetActivityAction,
    setEvent: setEventAction,
    setDetail: setDetailAction,
  }
)
export default class Home extends Component {

  static propTypes = {
    setEvent: PropTypes.func.isRequired,
    resetEvent: PropTypes.func.isRequired,
    resetActivity: PropTypes.func.isRequired,
    fetchEvents: PropTypes.func.isRequired,
    setCurrentEvent: PropTypes.func.isRequired,
    setDetail: PropTypes.func.isRequired,
    title: PropTypes.string,
    loggedIn: PropTypes.bool.isRequired,
    isRefreshing: PropTypes.bool.isRequired,
    events: PropTypes.arrayOf(PropTypes.object)
  };

  componentDidMount() {
    this.props.fetchEvents();
  }

  render() {
    const {
      events,
      fetchEvents,
      setCurrentEvent,
      isRefreshing,
      resetEvent,
      setEvent,
      resetActivity,
      setDetail,
    } = this.props;

    return (
      <View style={styles.container}>
        <EventList
          events={events}
          refresh={fetchEvents}
          isRefreshing={isRefreshing}
          setCurrentEvent={setCurrentEvent}
          setEvent={setEvent}
          setDetail={setDetail}
        />
        <PlusButton
          itemSize={45}
          radius={80}
          startDegree={225}
          endDegree={315}
          items={[
            {
              title: 'event',
              action: () => {
                resetEvent();
                Actions.searchEvents();
              },
              icon: 'compass'
            },
            {
              title: 'activity',
              action: () => {
                resetActivity();
                Actions.editCreateActivity();
              },
              icon: 'coffee'
            }
          ]}
        />
      </View>
    );
  }
}
