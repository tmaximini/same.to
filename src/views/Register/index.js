import React, { Component, PropTypes } from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  Image,
} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Input from '../../components/Input';
import { actions as authActions } from '../../redux/modules/auth';

import { WithPadding } from '../../components/Layout';
import Button from '../../components/Button';
import { COLORS } from '../../constants';
import styles from '../Login/styles';

const logo = require('../../assets/logo.png');


@connect(
  state => state.auth,
  authActions,
)
export default class Login extends Component {

  static propTypes = {
    update: PropTypes.func.isRequired,
    resetErrors: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    email: PropTypes.string,
    deviceId: PropTypes.string,
    username: PropTypes.string,
    password: PropTypes.string,
    name: PropTypes.string,
    isLoading: PropTypes.bool,
    title: PropTypes.string,
    error: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.onRegister = this.onRegister.bind(this);
  }

  onRegister() {
    const { register, update, username, email, password, deviceId } = this.props;
    if (email && password) {
      register({ username, email, password, deviceId });
    } else {
      update('error', 'Username, E-Mail and Password required');
    }
  }


  render() {
    const {
      update,
      resetErrors,
      username,
      email,
      password,
      error,
      isLoading,
    } = this.props;

    return (
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator
            animating
            color={COLORS.CYAN}
            style={{ height: 80 }}
            size="large"
          />
        ) : (
          <View style={styles.wrapper}>
            <View style={styles.logoWrapper}>
              <Image
                source={logo}
                resizeMode="cover"
                style={styles.logo}
              />
            </View>
            <WithPadding>
              {error && <Text style={styles.error}>{error}</Text>}
              <Input
                placeholder="Username"
                value={username}
                onChangeText={(text) => update('username', text)}
              />
              <Input
                placeholder="E-Mail"
                value={email}
                onChangeText={(text) => update('email', text)}
              />
              <Input
                placeholder="Password"
                value={password}
                onChangeText={(text) => update('password', text)}
                secureTextEntry
              />
              <Button
                onPress={this.onRegister}
              >
                <Text style={styles.buttonText}>Register</Text>
              </Button>
              <Button
                text="Login"
                textColor="#fff"
                noBackground
                onPress={() => {
                  resetErrors();
                  Actions.pop();
                }}
              />
            </WithPadding>
          </View>
        )}
        <KeyboardSpacer />
      </View>
    );
  }
}



