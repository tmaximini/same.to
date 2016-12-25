/**
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity
} from 'react-native';


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


export default class Login extends Component {

  navigateTo = key => () => {
    const { navigate } = this.props;
    navigate(key);
  }

  render() {
    return (
      <Image
        style={[styles.container, styles.background]}
        resizeMode="cover"
        source={background}
      >
        <View style={styles.container} />
        <View style={styles.wrapper}>
          <View style={styles.inputWrap}>
            <View style={styles.iconWrap}>
              <Image
                source={login}
                style={styles.icon}
                resizeMode="contain"
              />
            </View>
            <TextInput
              placeholder="Username"
              style={styles.input}
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={styles.inputWrap}>
            <View style={styles.iconWrap}>
              <Image
                source={password}
                style={styles.icon}
                resizeMode="contain"
              />
            </View>
            <TextInput
              placeholder="Password"
              secureTextEntry
              style={styles.input}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={this.navigateTo('home')}
          >
            <View style={styles.button}>
              <Text style={styles.buttonText}>Sign In</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={this.navigateTo('lostPassword')}
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



