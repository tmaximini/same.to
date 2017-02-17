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
import {
  actions as tripActions
} from '../../redux/modules/editCreateTrip';
import {
  actions as activityActions
} from '../../redux/modules/editCreateActivity';
import {
  actions as accommodationActions
} from '../../redux/modules/editCreateAccommodation';
import { updateAuthHeader, updateUserId } from '../../services/api';
import styles from './styles';

@connect(
  state => state.auth,
  {
    fetchProfile: profileActions.fetchProfile,
    getTripTypes: tripActions.getTypes,
    getAccommodationTypes: accommodationActions.getTypes,
    getActivityTypes: activityActions.getTypes,
  }
)
export default class Splash extends Component {

  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    getActivityTypes: PropTypes.func.isRequired,
    getTripTypes: PropTypes.func.isRequired,
    getAccommodationTypes: PropTypes.func.isRequired,
    fetchProfile: PropTypes.func.isRequired,
    userId: PropTypes.string,
    token: PropTypes.string,
  };

  componentDidMount() {
    this.handleRouting(this.props);
    const { getTripTypes, getAccommodationTypes, getActivityTypes } = this.props;
    getTripTypes();
    getAccommodationTypes();
    getActivityTypes();
  }

  componentWillReceiveProps(nextProps) {
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
