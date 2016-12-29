/**
 * @flow
 */

import React, { Component, PropTypes } from 'react';
import {
  Text,
  View,
  Image,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Input from '../../components/Input';
import { actions as authActions } from '../../redux/modules/auth';

import Button from '../../components/Button';
import styles from './styles';

const background = require('../../assets/sunflowers.jpg');
const login = require('../../assets/login.png');
const password = require('../../assets/password.png');


@connect(
  state => ({
    auth: state.auth
  }),
  dispatch => bindActionCreators(authActions, dispatch)
)
export default class Login extends Component {

  static propTypes = {
    navigateTo: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
    auth: PropTypes.shape({
      password: PropTypes.string,
      username: PropTypes.string
    })
  };

  handleNavigation = key => () => {
    const { navigateTo } = this.props;
    navigateTo(key);
  }

  render() {
    const {
      update,
      auth
    } = this.props;
    return (
      <Image
        style={[styles.container, styles.background]}
        resizeMode="cover"
        source={null}
      >
        <View style={styles.container} />
        <View style={styles.wrapper}>
          <Input
            placeholder="Username"
            icon={login}
            value={auth.username}
            onChangeText={(text) => update('username', text)}
          />
          <Input
            placeholder="Password"
            icon={password}
            value={auth.password}
            onChangeText={(text) => update('password', text)}
            secureTextEntry
          />
          <Button
            style={{ backgroundColor: '#d73352' }}
            onPress={this.handleNavigation('editProfile')}
          >
            <Text style={styles.buttonText}>Sign In</Text>
          </Button>
          <Button
            text="Forgot Password?"
            textColor="#fff"
            noBorder
            onPress={this.handleNavigation('lostPassword')}
          />
        </View>
        <View style={styles.container} />
      </Image>
    );
  }
}



