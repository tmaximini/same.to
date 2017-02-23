import React, { Component, PropTypes } from 'react';
import I18n from 'react-native-i18n';
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
import dismissKeyboard from 'react-native-dismiss-keyboard';
import Form from '../../layouts/form';
import Input from '../../components/Input';
import { actions as authActions } from '../../redux/modules/auth';

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
      dismissKeyboard();
      setTimeout(() => this.props.update('isLoading', false), 2500);
    } else {
      update('error', 'E-Mail and Password required');
    }
  }

  onFacebookLogin() {
    LoginManager.logInWithReadPermissions(['email', 'public_profile']).then(
      result => {
        this.props.update('isLoading', true);
        if (result.isCancelled) {
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
        setTimeout(() => this.props.update('isLoading', false), 2500);
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
      <Form
        keyboardShouldPersistTaps="always"
      >
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
          <Button
            onPress={this.onFacebookLogin}
            text={I18n.t('login_facebook')}
            noResize
          />
          <Text style={styles.or}>or</Text>
          {error && <Text style={styles.error}>{error}</Text>}
          <Input
            placeholder={I18n.t('email')}
            value={email}
            keyboardType="email-address"
            onChangeText={(text) => update('email', text)}
          />
          <Input
            placeholder={I18n.t('password')}
            value={password}
            onChangeText={(text) => update('password', text)}
            secureTextEntry
          />
          <Button
            onPress={this.onLogin}
            text={I18n.t('login')}
          />
          <Text style={styles.or}>{I18n.t('or')}</Text>
          <Button
            text={I18n.t('register')}
            textColor="#fff"
            noBackground
            onPress={() => {
              resetErrors();
              Actions.register();
            }}
          />
        </View>
        )}
      </Form>
    );
  }
}



