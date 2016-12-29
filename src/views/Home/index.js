import React, { Component, PropTypes } from 'react';
import {
  Text,
  View,
} from 'react-native';

import NavigationBar from 'react-native-navbar';
import { VerticalCentered } from '../../components/Layout';
import Button from '../../components/Button';
import styles from './styles';


export default class Home extends Component {

  static propTypes = {
    navigateTo: PropTypes.func.isRequired,
    title: PropTypes.string,
  };

  toLogin = () => {
    const { navigateTo } = this.props;
    navigateTo('login');
  }

  render() {
    const titleConfig = {
      title: this.props.title || 'Home'
    };

    return (
      <View style={styles.container}>
        <NavigationBar
          title={titleConfig}
        />
        <VerticalCentered>
          <Text style={styles.welcome}>
            Welcome to Same.to!
          </Text>
          <Button
            onPress={this.toLogin}
            text="Navigate to Login"
          />
        </VerticalCentered>
      </View>
    );
  }
}
