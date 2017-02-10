import React, { Component, PropTypes } from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  Image,
} from 'react-native';
// import KeyboardSpacer from 'react-native-keyboard-spacer';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
  LoginManager,
  AccessToken
} from 'react-native-fbsdk';
import KeyboardScroll from '../../components/KeyboardScroll';
import Input from '../../components/Input';
import { actions as authActions } from '../../redux/modules/auth';

import { WithPadding } from '../../components/Layout';
import Button from '../../components/Button';
import { COLORS } from '../../constants';
import styles from './styles';

const logo = require('../../assets/logo.png');


@connect(
  state => state.auth,
  authActions,
)
export default class Login extends Component {

  static propTypes = {
    update: PropTypes.func.isRequired,
    resetErrors: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    facebookLogin: PropTypes.func.isRequired,
    email: PropTypes.string,
    username: PropTypes.string,
    password: PropTypes.string,
    isLoading: PropTypes.bool,
    title: PropTypes.string,
    error: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.onLogin = this.onLogin.bind(this);
    this.onFacebookLogin = this.onFacebookLogin.bind(this);
    this.onLoginFinished = this.onLoginFinished.bind(this);
  }

  onLogin() {
    const { login, update, email, password } = this.props;
    if (email && password) {
      login({ email, password });
    } else {
      update('error', 'E-Mail and Password required');
    }
  }

  onFacebookLogin() {
    LoginManager.logInWithReadPermissions(['email', 'public_profile']).then(
      result => {
        this.props.update('isLoading', true);
        if (result.isCancelled) {
          console.log('Login was cancelled');
          this.props.update('isLoading', false);
        } else {
          this.onLoginFinished();
        }
      },
      error => {
        alert(`Login failed with error: ${error}`);
        this.props.update('error', error);
        this.props.update('isLoading', false);
      }
    );
  }

  onLoginFinished() {
    AccessToken.getCurrentAccessToken()
      .then(data => {
        this.props.update('facebook', data);
        this.props.facebookLogin({ access_token: data.accessToken });
        this.props.update('isLoading', false);
      });
  }


  render() {
    const {
      update,
      email,
      password,
      error,
      isLoading,
      resetErrors,
    } = this.props;


    return (
      <View style={styles.container}>
        <KeyboardScroll>
        {isLoading ? (
          <View style={styles.loadingWrapper}>
            <ActivityIndicator
              animating
              color={COLORS.CYAN}
              style={{ height: 80 }}
              size="large"
            />
          </View>
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
              <Button
                onPress={this.onFacebookLogin}
              >
                <Text style={styles.buttonText}>Mit Facebook anmelden</Text>
              </Button>
              {error && <Text style={styles.error}>{error}</Text>}
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
                onPress={this.onLogin}
              >
                <Text style={styles.buttonText}>Sign In</Text>
              </Button>
              <Button
                text="Register"
                textColor="#fff"
                noBackground
                onPress={() => {
                  resetErrors();
                  Actions.register();
                }}
              />
              {/*
              <Button
                text="Forgot Password?"
                textColor="#fff"
                noBorder
                noBackground
                onPress={Actions.lostPassword}
              />
              */}
            </WithPadding>
          </View>
          )}
        </KeyboardScroll>
      </View>
    );
  }
}



