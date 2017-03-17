import React, { Component, PropTypes } from 'react';
import {
  View,
  NetInfo,
} from 'react-native';
import { connect } from 'react-redux';
import EventList from '../../components/EventList';
import { actions as eventActions } from '../../redux/modules/events';
import {
  resetEvent as resetEventAction,
  setEvent as setEventAction,
} from '../../redux/modules/editCreateEvent';
import {
  setDetail as setDetailAction,
} from '../../redux/modules/detail';
import {
  resetActivity as resetActivityAction,
  setActivity as setActivityAction,
} from '../../redux/modules/editCreateActivity';
import styles from './styles';

@connect(
  state => ({
    pastEvents: state.events.pastEvents,
    isRefreshing: state.events.isFetching,
    loggedIn: state.auth.loggedIn,
  }),
  {
    ...eventActions,
    resetEvent: resetEventAction,
    resetActivity: resetActivityAction,
    setEvent: setEventAction,
    setActivity: setActivityAction,
    setDetail: setDetailAction,
  }
)
export default class Archive extends Component {
  static propTypes = {
    setEvent: PropTypes.func.isRequired,
    resetEvent: PropTypes.func.isRequired,
    fetchPastEvents: PropTypes.func.isRequired,
    setCurrentEvent: PropTypes.func.isRequired,
    setDetail: PropTypes.func.isRequired,
    title: PropTypes.string,
    loggedIn: PropTypes.bool.isRequired,
    isRefreshing: PropTypes.bool.isRequired,
    pastEvents: PropTypes.arrayOf(PropTypes.object),
  };

  constructor() {
    super();
    this.onConnectivityChange = this.onConnectivityChange.bind(this);
  }

  componentDidMount() {
    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected) {
        this.props.fetchPastEvents();
      }
    });
    NetInfo.isConnected.addEventListener(
      'change',
      this.onConnectivityChange
    );
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      'change',
      this.onConnectivityChange
    );
  }

  onConnectivityChange(connected) {
    if (connected) {
      this.props.fetchPastEvents();
    }
  }

  render() {
    const {
      pastEvents,
      fetchPastEvents,
      isRefreshing,
    } = this.props;

    return (
      <View style={styles.container}>
        <EventList
          archive
          events={pastEvents}
          refresh={fetchPastEvents}
          isRefreshing={isRefreshing}
          {...this.props}
        />
      </View>
    );
  }
}
