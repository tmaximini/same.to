import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
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
export default class EditCreateAccomodation extends Component {

  render() {
    return (
      <View>
        <View style={styles.container} />
        <Text>EditCreateAccomodation</Text>
        <View style={styles.container} />
      </View>
    );
  }
}



