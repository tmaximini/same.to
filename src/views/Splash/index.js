import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
  View,
  ActivityIndicator,
} from 'react-native';
import {
  actions as profileActions
} from '../../redux/modules/editCreateProfile';
import { updateAuthHeader, updateUserId } from '../../services/api';
import styles from './styles';

@connect(
  state => state.auth,
  profileActions,
)
export default class Splash extends Component {

  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    fetchProfile: PropTypes.func.isRequired,
    userId: PropTypes.string,
    token: PropTypes.string,
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
        const { userId, token } = props;
        updateUserId(userId);
        updateAuthHeader(token);
        Actions.tabbar({ key: 'tabbar', type: 'reset' });
        Actions.home({ type: 'replace' });
        this.props.fetchProfile();
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
