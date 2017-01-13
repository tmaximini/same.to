import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
} from 'react-native';

import { connect } from 'react-redux';
import { actions as profileActions } from '../../redux/modules/profile';

import styles from './styles';


export default class EditCreateTrip extends Component {

  render() {
    return (
      <View>
        <View style={styles.container} />
        <Text>EditCreateTrip</Text>
        <View style={styles.container} />
      </View>
    );
  }
}



