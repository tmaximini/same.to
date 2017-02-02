import React, { Component, PropTypes } from 'react';
import {
  Text,
  View,
} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import { connect } from 'react-redux';
import NavigationBar from 'react-native-navbar';
import { Actions } from 'react-native-router-flux';
import Input from '../../components/Input';
import { actions as authActions } from '../../redux/modules/auth';

import { VerticalCentered, WithPadding } from '../../components/Layout';
import Button from '../../components/Button';
import styles from './styles';
// import { border } from '../../utils';

const FBSDK = require('react-native-fbsdk');

const {
  LoginManager,
  LoginButton,
  AccessToken
} = FBSDK;

@connect(
  state => ({
    auth: state.auth
  }),
  authActions,
)
export default class Login extends Component {

  static propTypes = {
    update: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    facebookLogin: PropTypes.func.isRequired,
    auth: PropTypes.shape({
      email: PropTypes.string,
      username: PropTypes.string
    }),
    title: PropTypes.string,
  };

  handleLogin = () => {
    const { login, auth, update } = this.props;
    const { email, password } = auth;
    if (email && password) {
      login({ email, password });
    } else {
      update('error', 'E-Mail and Password required');
    }
  }

  handleFacebookLogin = () => {
    LoginManager.logInWithReadPermissions(['email']).then(
      result => {
        if (result.isCancelled) {
          alert('Login was cancelled');
        } else {
          alert('Login was successful with permissions: '
            + result.grantedPermissions.toString());
        }
      },
      error => {
        alert('Login failed with error: ' + error);
      }
    );
  }

  onLoginFinished = (err, response) => {
    AccessToken.getCurrentAccessToken()
      .then(data => {
        this.props.update('facebook', data);
        this.props.facebookLogin({ access_token: data.accessToken });
      });
  }

  onLogoutFinished = () => {
    this.props.update('facebook', {});
  }

  render() {
    const {
      update,
      auth,
    } = this.props;

    const { email, password, error } = auth;

    const titleConfig = {
      title: this.props.title || 'Login'
    };

    return (
      <View style={styles.container}>
        <NavigationBar
          title={titleConfig}
        />
        <VerticalCentered>
          <WithPadding>
            <LoginButton
              onLoginFinished={this.onLoginFinished}
              onLogoutFinished={this.onLogoutFinished}
            />
            <Text style={styles.or}>Or</Text>
            {error && <Text style={styles.error}>{error}</Text>}
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
              onPress={this.handleLogin}
            >
              <Text style={styles.buttonText}>Sign In</Text>
            </Button>
            <View style={styles.buttonWrapper}>
              <Button
                text="Register"
                textColor="#fff"
                noBorder
                noBackground
                onPress={Actions.lostPassword}
              />
              <Button
                text="Forgot Password?"
                textColor="#fff"
                noBorder
                noBackground
                onPress={Actions.lostPassword}
              />
            </View>
          </WithPadding>
        </VerticalCentered>
        <KeyboardSpacer />
      </View>
    );
  }
}



