import React, { Component, PropTypes } from 'react';
import {
  View
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Input from '../../components/Input';
import { actions as profileActions } from '../../redux/modules/profile';

import styles from './styles';

@connect(
  state => ({
    profile: state.profile
  }),
  dispatch => bindActionCreators(profileActions, dispatch)
)
export default class EditProfile extends Component {

  static propTypes = {
    navigateTo: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
    profile: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string
    })
  };

  handleNavigation = key => () => {
    const { navigateTo } = this.props;
    navigateTo(key);
  }

  render() {
    const {
      update,
      profile
    } = this.props;
    return (
      <View>
        <View style={styles.container} />
        <View style={styles.wrapper}>
          <Input
            placeholder="First Name"
            value={profile.firstName}
            onChangeText={(text) => update('firstName', text)}
          />
          <Input
            placeholder="Last Name"
            value={profile.lastName}
            onChangeText={(text) => update('lastName', text)}
          />
        </View>
        <View style={styles.container} />
      </View>
    );
  }
}



