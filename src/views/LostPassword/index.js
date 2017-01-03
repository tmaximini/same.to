import React, { Component, PropTypes } from 'react';
import {
  Text,
  View,
} from 'react-native';

import Button from '../../components/Button';
import styles from './styles';


export default class LostPassword extends Component {

  // static propTypes = {
  //   navigateTo: PropTypes.func.isRequired
  // };

  resetPassword = () => {}

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Please enter your credentials and we send you a reset link!
        </Text>
        <Button
          onPress={this.resetPassword}
          text="Reset my Password"
        />
      </View>
    );
  }
}
