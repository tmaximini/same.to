import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
  View,
  ActivityIndicator,
} from 'react-native';

import styles from './styles';

@connect(
  state => state.auth,
  {},
)
export default class Splash extends Component {

  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
  };

  componentDidMount() {
    this.handleRouting(this.props);
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps', nextProps);
    this.handleRouting(nextProps);
  }

  handleRouting = (props) => {
    if (props.rehydrateFinished) {
      if (props.loggedIn) {
        Actions.tabbar({ key: 'tabbar', type: 'reset' });
        Actions.home({ type: 'replace' });
      } else {
        Actions.login({ type: 'replace' });
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          style={styles.centering}
          animating
          size="large"
        />
      </View>
    );
  }

}
