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

  componentWillMount() {
    this.props.fetchEvents();
  }

  toLogin = () => {
    const { navigateTo } = this.props;
    navigateTo('login');
  }

  render() {
    const titleConfig = {
      title: this.props.title || 'Home / Feed',
    };

    return (
      <View style={styles.container}>
        <NavigationBar
          title={titleConfig}
        />
        <EventList
          events={this.props.events}
        />
      </View>
    );
  }
}
