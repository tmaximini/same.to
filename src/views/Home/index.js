import React, { Component, PropTypes } from 'react';
import {
  Text,
  View,
} from 'react-native';

import Button from '../../components/Button';
import styles from './styles';


export default class Home extends Component {
  static propTypes = {
    navigateTo: PropTypes.func.isRequired
  };

  toLogin = () => {
    const { navigateTo } = this.props;
    navigateTo('login');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to Same.to!
        </Text>
        <Button
          onPress={this.toLogin}
          text="Navigate to Login"
        />
      </View>
    );
  }
}
