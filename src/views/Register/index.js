import React, { Component, PropTypes } from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { actions as authActions } from '../../redux/modules/auth';
import Input from '../../components/Input';
import Form from '../../layouts/form';
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
      <Form>
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
            {error && <Text style={styles.error}>{error}</Text>}
            <Input
              placeholder="Username"
              value={username}
              onChangeText={(text) => update('username', text)}
            />
            <Input
              placeholder="E-Mail"
              value={email}
              keyboardType="email-address"
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
              text="Register"
            />
            <Button
              text="Login"
              noBackground
              onPress={() => {
                resetErrors();
                Actions.pop();
              }}
            />
          </View>
        )}
      </Form>
    );
  }
}



