import React, { Component, PropTypes } from 'react';
import {
  Text,
  View,
} from 'react-native';

import { connect } from 'react-redux';

import NavigationBar from 'react-native-navbar';
import EventList from '../../components/EventList';

import { actions as eventActions } from '../../redux/modules/events';
import styles from './styles';

@connect(
  state => state.events,
  eventActions,
)
export default class Home extends Component {

  static propTypes = {
    navigateTo: PropTypes.func.isRequired,
    fetchEvents: PropTypes.func.isRequired,
    title: PropTypes.string,
    events: PropTypes.arrayOf(PropTypes.object)
  };

  componentDidMount() {
    this.props.fetchEvents();
  }

  render() {
    const titleConfig = {
      title: this.props.title || 'Home / Feed',
    };

    const { events } = this.props;

    console.log({ events });

    return (
      <View style={styles.container}>
        <NavigationBar
          title={titleConfig}
        />
        <EventList
          events={events}
        />
      </View>
    );
  }
}
