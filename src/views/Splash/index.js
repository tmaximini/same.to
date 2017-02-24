import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
  View,
  ActivityIndicator,
  NetInfo,
} from 'react-native';
import {
  actions as profileActions,
} from '../../redux/modules/editCreateProfile';
import {
  actions as tripActions,
} from '../../redux/modules/editCreateTrip';
import {
  actions as activityActions,
} from '../../redux/modules/editCreateActivity';
import {
  actions as accommodationActions,
} from '../../redux/modules/editCreateAccommodation';
import {
  actions as contactActions,
} from '../../redux/modules/contacts';
import { updateAuthHeader, updateUserId } from '../../services/api';
import { COLORS } from '../../constants';
import styles from './styles';

@connect(
  state => ({
    ...state.auth,
    ...state.editCreateProfile,
  }),
  {
    fetchProfile: profileActions.fetchProfile,
    getTripTypes: tripActions.getTypes,
    getAccommodationTypes: accommodationActions.getTypes,
    getActivityTypes: activityActions.getTypes,
    fetchContacts: contactActions.fetchContacts,
    fetchFavorites: contactActions.fetchFavorites,
  }
)
export default class Splash extends Component {

  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    rehydrateFinished: PropTypes.bool,
    getActivityTypes: PropTypes.func.isRequired,
    fetchContacts: PropTypes.func.isRequired,
    getTripTypes: PropTypes.func.isRequired,
    fetchFavorites: PropTypes.func.isRequired,
    getAccommodationTypes: PropTypes.func.isRequired,
    fetchProfile: PropTypes.func.isRequired,
    userId: PropTypes.string,
    token: PropTypes.string,
    profile: PropTypes.object,
  };

  constructor() {
    super();
    this.onConnectivityChange = this.onConnectivityChange.bind(this);
    this.fetchAppData = this.fetchAppData.bind(this);
  }

  componentDidMount() {
    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected) {
        this.onConnectivityChange(isConnected);
      }
    });
    NetInfo.isConnected.addEventListener(
      'change',
      this.onConnectivityChange
    );
    this.handleRouting(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.handleRouting(nextProps);
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      'change',
      this.onConnectivityChange
    );
  }

  onConnectivityChange(connected) {
    const { rehydrateFinished, loggedIn } = this.props;
    if (connected && rehydrateFinished && loggedIn) {
      this.fetchAppData();
    }
  }

  fetchAppData() {
    const {
      getTripTypes,
      getAccommodationTypes,
      getActivityTypes,
      fetchFavorites,
      fetchContacts,
    } = this.props;
    getTripTypes();
    getAccommodationTypes();
    getActivityTypes();
    fetchFavorites();
    fetchContacts();
  }

  handleRouting = (props) => {
    if (props.rehydrateFinished) {
      if (props.loggedIn) {
        const { userId, token, profile } = props;
        updateUserId(userId);
        updateAuthHeader(token);
        if (profile && !profile.signupCompleted) {
          Actions.editCreateProfile({ type: 'replace' });
        } else {
          Actions.tabbar({ key: 'tabbar', type: 'reset' });
          Actions.home({ type: 'replace' });
          NetInfo.isConnected.fetch().then(isConnected => {
            if (isConnected) {
              this.fetchAppData();
            }
          });
        }
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
          color={COLORS.CYAN}
          size="large"
        />
      </View>
    );
  }

}
