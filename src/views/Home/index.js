import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default class Home extends Component {
  static propTypes = {
    navigateTo: PropTypes.func.isRequired
  };

  toLogin = () => {
    const { navigateTo } = this.props;
    navigateTo('login');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to Same.to!
        </Text>
        <TouchableOpacity onPress={this.toLogin}>
          <Text style={styles.instructions}>Navigate to Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
