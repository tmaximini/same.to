import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
  Text,
  View,
} from 'react-native';

@connect(
  state => state.auth,
  {},
)
export default class Splash extends Component {

  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.rehydrateFinished) {
      if (nextProps.loggedIn) {
        Actions.tabbar({ key: 'tabbar', type: 'reset' });
        Actions.home({ type: 'replace' });
      } else {
        Actions.login({ type: 'replace' });
      }
    }
  }


  render() {
    return (
      <View>
        <Text>Initializing...</Text>
      </View>
    );
  }

}
