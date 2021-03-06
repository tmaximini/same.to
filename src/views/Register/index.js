import React, { Component, PropTypes } from 'react';
import I18n from 'react-native-i18n';
import {
  Text,
  View,
  ActivityIndicator,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import dismissKeyboard from 'react-native-dismiss-keyboard';
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
    const { register, update, email, password, deviceId } = this.props;
    if (email && password) {
      dismissKeyboard();
      register({ email, password, deviceId });
    } else {
      update('error', 'Username, E-Mail and Password required');
    }
  }


  render() {
    const {
      update,
      resetErrors,
      email,
      password,
      error,
      isLoading,
    } = this.props;

    return (
      <Form
        keyboardShouldPersistTaps="always"
      >
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
            {/*<Input
              placeholder="Username"
              value={username}
              onChangeText={(text) => update('username', text)}
            />*/}
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
              onPress={this.onRegister}
              text={I18n.t('register')}
            />
            <Text style={styles.or}>or</Text>
            <Button
              text={I18n.t('login')}
              noBackground
              onPress={() => {
                resetErrors();
                dismissKeyboard();
                Actions.pop();
              }}
            />
          </View>
        )}
      </Form>
    );
  }
}



