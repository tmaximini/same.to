/**
 * @flow
 */

import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Input from '../../components/Input';
import { actions as authActions } from '../../redux/modules/auth';


const background = require('../../assets/sunflowers.jpg');
const login = require('../../assets/login.png');
const password = require('../../assets/password.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    width: null,
    height: null,
  },
  wrapper: {
    paddingHorizontal: 15
  },
  inputWrap: {
    flexDirection: 'row',
    marginVertical: 10,
    height: 40,
    backgroundColor: 'transparent',
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
  },
  iconWrap: {
    paddingHorizontal: 7,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d73352'
  },
  icon: {
    width: 20,
    height: 20
  },
  button: {
    backgroundColor: '#d73352',
    paddingVertical: 15,
    marginVertical: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 18
  },
  forgotPasswordText: {
    color: '#fff',
    backgroundColor: 'transparent',
    textAlign: 'center'
  }
});

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
        source={background}
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
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={this.handleNavigation('home')}
          >
            <View style={styles.button}>
              <Text style={styles.buttonText}>Sign In</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={this.handleNavigation('lostPassword')}
          >
            <View>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.container} />
      </Image>
    );
  }
}



