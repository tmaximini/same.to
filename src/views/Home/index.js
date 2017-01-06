import React, { Component, PropTypes } from 'react';
import {
  View,
} from 'react-native';

import { connect } from 'react-redux';

import EventList from '../../components/EventList';

import { actions as eventActions } from '../../redux/modules/events';
import styles from './styles';

@connect(
  state => state.events,
  eventActions,
)
export default class Home extends Component {

  static propTypes = {
    fetchEvents: PropTypes.func.isRequired,
    title: PropTypes.string,
    events: PropTypes.arrayOf(PropTypes.object)
  };

  componentDidMount() {
    this.props.fetchEvents();
  }

  render() {
    const { events } = this.props;

    console.log({ events });

    return (
      <View style={styles.container}>

        <EventList
          events={events}
        />
      </View>
    );
  }
}
