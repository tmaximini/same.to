import React, { Component, PropTypes } from 'react';
import {
  Text,
  View,
} from 'react-native';

import { connect } from 'react-redux';
import NavigationBar from 'react-native-navbar';
import Input from '../../components/Input';
import { actions as authActions } from '../../redux/modules/auth';

import { VerticalCentered, WithPadding } from '../../components/Layout';
import Button from '../../components/Button';
import styles from './styles';
// import { border } from '../../utils';


@connect(
  state => ({
    auth: state.auth
  }),
  authActions,
)
export default class Login extends Component {

  static propTypes = {
    navigateTo: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    checkStorage: PropTypes.func.isRequired,
    auth: PropTypes.shape({
      email: PropTypes.string,
      username: PropTypes.string
    }),
    title: PropTypes.string,
  };

  componentWillMount() {
    this.props.checkStorage();
  }

  handleNavigation = key => () => {
    const { navigateTo } = this.props;
    navigateTo(key);
  }

  handleLogin = () => {
    const { login, auth } = this.props;
    const { email, password } = auth;
    login({ email, password });
  }

  render() {
    const {
      update,
      auth,
    } = this.props;

    console.log({ authActions });

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
            <Button
              style={{ backgroundColor: '#d73352' }}
              onPress={() => console.log('facebook')}
            >
              <Text style={styles.buttonText}>Login with Facebook</Text>
            </Button>
            <Text style={styles.or}>Or</Text>
            <Input
              placeholder="E-Mail"
              value={auth.email}
              onChangeText={(text) => update('email', text)}
            />
            <Input
              placeholder="Password"
              value={auth.password}
              onChangeText={(text) => update('password', text)}
              secureTextEntry
            />
            <Button
              style={{ backgroundColor: '#d73352' }}
              onPress={this.handleLogin}
            >
              <Text style={styles.buttonText}>Sign In</Text>
            </Button>
            <View style={styles.buttonWrapper}>
              <Button
                text="Register"
                textColor="#fff"
                noBorder
                onPress={this.handleNavigation('lostPassword')}
              />
              <Button
                text="Forgot Password?"
                textColor="#fff"
                noBorder
                onPress={this.handleNavigation('lostPassword')}
              />
            </View>
          </WithPadding>
        </VerticalCentered>
      </View>
    );
  }
}



