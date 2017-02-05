import React, { Component, PropTypes } from 'react';
import {
  View
} from 'react-native';

import { connect } from 'react-redux';
import Input from '../../components/Input';
import { actions as profileActions } from '../../redux/modules/editCreateProfile';

import styles from './styles';

@connect(
  state => state.profile,
  profileActions,
)
export default class EditProfile extends Component {

  static propTypes = {
    update: PropTypes.func.isRequired,
    profile: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string
    })
  };

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



