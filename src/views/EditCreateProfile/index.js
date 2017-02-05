import React, { Component, PropTypes } from 'react';
import {
  View,
  ScrollView
} from 'react-native';

import { connect } from 'react-redux';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Input from '../../components/Input';
import PlusButton from '../../components/PlusButton';
import GeoInput from '../../components/GeoInput';
import Button from '../../components/Button';
import { actions as profileActions } from '../../redux/modules/editCreateProfile';

import styles from './styles';

@connect(
  state => state.editCreateProfile,
  profileActions,
)
export default class EditCreateProfile extends Component {

  static propTypes = {
    update: PropTypes.func.isRequired,
    geocodeLocation: PropTypes.func.isRequired,
    locationString: PropTypes.string,
    isNew: PropTypes.bool,
    profile: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      occupaction: PropTypes.string,
      employer: PropTypes.string,
      hobbies: PropTypes.string,
      gender: PropTypes.string,
    }),
  };

  render() {
    const {
      profile,
      update,
      geocodeLocation,
      locationString,
      isNew,
    } = this.props;

    const {
      firstName,
      lastName,
      occupaction,
      employer,
      hobbies,
      gender,
    } = profile;

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.wrapper}>
          <View style={styles.inputGroup}>
            <Input
              placeholder="First Name"
              value={firstName}
              onChangeText={(text) => update('firstName', text)}
              style={{ flex: 1 }}
            />
            <View style={styles.spacer}></View>
            <Input
              placeholder="Last Name"
              value={lastName}
              onChangeText={(text) => update('lastName', text)}
              style={{ flex: 1 }}
            />
          </View>
          <Input
            placeholder="Tätigkeit"
            value={occupaction}
            onChangeText={(text) => update('occupaction', text)}
          />
          <Input
            placeholder="Arbeitgeber"
            value={employer}
            onChangeText={(text) => update('employer', text)}
          />
          <GeoInput
            placeholder="Wohnort"
            enablePoweredByContainer={false}
            value={locationString}
            onChangeText={text => update('locationString', text)}
            onAdressSelect={geocodeLocation}
          />
          <Input
            placeholder="Hobbies"
            value={hobbies}
            onChangeText={(text) => update('hobbies', text)}
          />

          <Button
            text={isNew ? 'Save' : 'Update'}
            onPress={() => {}}
          />
          <KeyboardSpacer />
        </ScrollView>
      </View>
    );
  }
}



